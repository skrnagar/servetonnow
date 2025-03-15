
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Ensure URL is valid by attempting to construct it
try {
  if (!supabaseUrl.startsWith('https://')) {
    throw new Error('Supabase URL must start with https://')
  }
  new URL(supabaseUrl)
} catch (error) {
  throw new Error(`Invalid Supabase URL format: ${error.message}`)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
