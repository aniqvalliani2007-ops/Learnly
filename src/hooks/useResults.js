import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useResults = (uploadId) => {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!uploadId) {
      setLoading(false)
      return
    }

    const fetchResults = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('summaries')
          .select('*')
          .eq('upload_id', uploadId)
          .single()

        if (fetchError) throw fetchError
        setResults(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [uploadId])

  return { results, loading, error }
}
