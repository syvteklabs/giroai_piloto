import { createClient } from '@supabase/supabase-js'

let supabaseInstance: any = null

function initSupabase() {
  if (supabaseInstance) return supabaseInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      'Supabase environment variables are not configured. ' +
      'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file. ' +
      'See .env.local.example for details.'
    )
    return null
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseInstance
}

export const supabase = new Proxy({} as any, {
  get: (target, prop) => {
    const instance = initSupabase()
    if (!instance) {
      throw new Error(
        'Supabase not initialized. Missing environment variables. ' +
        'Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
      )
    }
    return instance[prop as string]
  },
})
