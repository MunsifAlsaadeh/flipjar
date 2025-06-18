import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthProvider'

export default function SellPage() {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>
  if (!user) return <p>Please login to sell items</p>

  return (
    <div>
      <h1>List a Product</h1>
      {/* Your listing form goes here */}
    </div>
  )
}


export default function Sell() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)

  const router = useRouter()

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    const uploadedUrls = []

    setUploading(true)

    for (const file of files) {
      const fileName = `${Date.now()}_${file.name}`
      const { data, error } = await supabase.storage.from('products').upload(fileName, file)

      if (error) {
        alert('Image upload failed: ' + error.message)
      } else {
        const url = supabase.storage.from('products').getPublicUrl(fileName).data.publicUrl
        uploadedUrls.push(url)
      }
    }

    setImages(uploadedUrls)
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await supabase.auth.getUser()
    const user_id = user.data.user.id

    const { error } = await supabase.from('products').insert([{
      title,
      description,
      price: parseFloat(price),
      category,
      condition,
      image_urls: images,
      user_id
    }])

    if (error) {
      alert('Failed to submit product: ' + error.message)
    } else {
      router.push('/explore')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">List a New Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" className="w-full p-2 border mb-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" className="w-full p-2 border mb-2" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price (AED)" className="w-full p-2 border mb-2" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Category" className="w-full p-2 border mb-2" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input type="text" placeholder="Condition" className="w-full p-2 border mb-2" value={condition} onChange={(e) => setCondition(e.target.value)} required />
        <input type="file" multiple onChange={handleImageUpload} className="mb-2" />
        {uploading && <p className="text-sm text-blue-600">Uploading images...</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Submit Listing</button>
      </form>
    </div>
  )
}
