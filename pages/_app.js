import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            // Optional: store in localStorage or context
            window.location.reload()
          }
        })
      }
    })
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
