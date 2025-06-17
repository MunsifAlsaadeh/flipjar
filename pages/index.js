import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Flipjar</h1>
      <Link href="/login" className="text-blue-600 underline">
        Sign In / Sign Up
      </Link>
    </div>
  )
}
