import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useProgress = (userId) => {
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchProgress = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', userId)
          .single()

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError
        setProgress(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [userId])

  return { progress, loading, error }
}
