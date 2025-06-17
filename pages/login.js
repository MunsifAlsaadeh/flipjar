import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    setLoading(false)
    if (!error) {
      alert('Check your email for the login link!')
    } else {
      alert(error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl mb-4 font-bold">Sign in to Flipjar</h2>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="border p-2 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Sending magic link...' : 'Send Magic Link'}
        </button>
      </form>
    </div>
  )
}
