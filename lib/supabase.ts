import { createClient } from '@supabase/supabase-js'

let supabaseInstance: any = null
let initError: string | null = null

function initSupabase() {
  if (supabaseInstance) return supabaseInstance
  if (initError) throw new Error(initError)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    initError = 'Supabase URL não configurado. Defina NEXT_PUBLIC_SUPABASE_URL nas variáveis de ambiente.'
    throw new Error(initError)
  }

  if (!supabaseAnonKey) {
    initError = 'Supabase chave anônima não configurada. Defina NEXT_PUBLIC_SUPABASE_ANON_KEY nas variáveis de ambiente.'
    throw new Error(initError)
  }

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    initError = 'Erro ao inicializar Supabase. Verifique as credenciais configuradas.'
    throw new Error(initError)
  }

  return supabaseInstance
}

export const supabase = new Proxy({} as any, {
  get: (target, prop) => {
    const instance = initSupabase()
    if (!instance) {
      throw new Error('Supabase ainda não configurado')
    }
    return instance[prop as string]
  },
})
