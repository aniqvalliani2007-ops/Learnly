import React, { createContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription?.unsubscribe()
  }, [])

  // Activity tracking: Update user session every 30 seconds when user is logged in
  useEffect(() => {
    if (!user?.id) return

    const updateActivity = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser()
        const currentUser = userData?.user
        
        if (currentUser) {
          await supabase
            .from('user_sessions')
            .upsert({
              user_id: currentUser.id,
              email: currentUser.email,
              full_name: currentUser.user_metadata?.full_name || null,
              last_activity: new Date().toISOString(),
            }, {
              onConflict: 'user_id'
            })
        }
      } catch (err) {
        console.warn('Failed to update activity:', err)
      }
    }

    // Update immediately on mount
    updateActivity()

    // Then update every 30 seconds
    const interval = setInterval(updateActivity, 30000)

    return () => clearInterval(interval)
  }, [user?.id])

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  const signup = async (email, password, firstName, lastName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`.trim(),
        },
        emailRedirectTo: undefined,
      },
    })
    if (error) throw error
    // If Supabase returns a session immediately, the user is signed in.
    // If email confirmation is disabled in the Supabase dashboard, this works directly.
    return data
  }

  const logout = async () => {
    // Clear user session activity before signing out
    if (user?.id) {
      try {
        await supabase
          .from('user_sessions')
          .delete()
          .eq('user_id', user.id)
      } catch (err) {
        console.warn('Failed to clear session:', err)
      }
    }
    
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
