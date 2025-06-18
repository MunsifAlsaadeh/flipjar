import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabase'

export default function Callback() {
  const router = useRouter()

  useEffect(() => {
    // This completes the magic link login and redirects home
    supabase.auth
      .getSessionFromUrl()
      .then(() => router.replace('/'))
      .catch((err) => {
        console.error('Login error:', err)
        router.replace('/login') // fallback
      })
  }, [router])

  return <p>Logging you in...</p>
}
