import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useQuiz = (uploadId) => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!uploadId) {
      setLoading(false)
      return
    }

    const fetchQuizzes = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('quizzes')
          .select('*')
          .eq('upload_id', uploadId)

        if (fetchError) throw fetchError
        setQuizzes(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [uploadId])

  return { quizzes, loading, error }
}
