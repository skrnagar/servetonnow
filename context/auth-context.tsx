
"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import { Session, User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  session: Session | null
  user: User | null
  isLoading: boolean
  signIn: {
    email: (email: string, password: string) => Promise<void>
    phone: (phone: string) => Promise<void>
    google: () => Promise<void>
    verifyOtp: (phone: string, token: string) => Promise<void>
  }
  signUp: {
    email: (email: string, password: string) => Promise<void>
    phone: (phone: string) => Promise<void>
  }
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = {
    email: async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
    },
    phone: async (phone: string) => {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      })
      if (error) throw error
    },
    google: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    },
    verifyOtp: async (phone: string, token: string) => {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms',
      })
      if (error) throw error
    },
  }

  const signUp = {
    email: async (email: string, password: string) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    },
    phone: async (phone: string) => {
      const { error } = await supabase.auth.signUp({
        phone,
      })
      if (error) throw error
    },
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.refresh()
  }

  const value = {
    session,
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
