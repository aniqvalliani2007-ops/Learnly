import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useFlashcards = (uploadId) => {
  const [flashcards, setFlashcards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!uploadId) {
      setLoading(false)
      return
    }

    const fetchFlashcards = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('flashcards')
          .select('*')
          .eq('upload_id', uploadId)

        if (fetchError) throw fetchError
        setFlashcards(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFlashcards()
  }, [uploadId])

  return { flashcards, loading, error }
}
