import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabase'

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      if (error) {
        console.error('Login failed:', error.message)
        router.replace('/login')
      } else {
        router.replace('/')
      }
    }

    handleLogin();
  }, [router])

  return <p>Completing login...</p>
}
