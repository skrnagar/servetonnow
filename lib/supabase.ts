
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Normalize and validate Supabase URL
const normalizedUrl = supabaseUrl?.trim() || ''

try {
  const url = new URL(normalizedUrl)
  if (url.protocol !== 'https:') {
    throw new Error('Supabase URL must use HTTPS protocol')
  }
} catch (error) {
  console.error('Supabase URL validation error:', error)
  throw new Error('Invalid Supabase URL format. Please check your environment variables.')
}

const supabase = createClient(normalizedUrl, supabaseAnonKey)

export default supabase
