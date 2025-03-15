
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Normalize and validate Supabase URL
const normalizedUrl = supabaseUrl.trim()
if (!normalizedUrl.startsWith('https://')) {
  throw new Error('Supabase URL must be a valid HTTPS URL')
}

try {
  new URL(normalizedUrl)
} catch (error) {
  throw new Error('Invalid Supabase URL format')
}

const supabase = createClient(normalizedUrl, supabaseAnonKey)

export default supabase
