import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setLoading(false)
        window.location.href = '/'
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoading(false)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  if (loading) return <p>Loading session...</p>

  return <Component {...pageProps} />
}

export default MyApp
