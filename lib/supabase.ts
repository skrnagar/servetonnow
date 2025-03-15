
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('Missing environment variable NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseAnonKey) {
  throw new Error('Missing environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

try {
  // Validate URL format
  new URL(supabaseUrl)
} catch (error) {
  throw new Error(`Invalid Supabase URL format: ${supabaseUrl}`)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
