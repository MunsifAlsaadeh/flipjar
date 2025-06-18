const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    redirectTo: 'https://flipjar.vercel.app/auth/callback',
    detectSessionInUrl: true,
    persistSession: true,
    autoRefreshToken: true
  }
});
