import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase: SupabaseClient | null = null

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

if (supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Failed to initialize Supabase:', error)
  }
}

export { supabase }

export function isSupabaseConfigured(): boolean {
  return !!supabase && !!supabaseUrl && !!supabaseAnonKey
}

export function getSupabaseError(): string {
  if (!supabaseUrl) return 'NEXT_PUBLIC_SUPABASE_URL não configurada'
  if (!supabaseAnonKey) return 'NEXT_PUBLIC_SUPABASE_ANON_KEY não configurada'
  return 'Supabase não configurado'
}

export function getSupabaseOrThrow(): SupabaseClient {
  if (!supabase) {
    throw new Error(getSupabaseError())
  }
  return supabase
}
