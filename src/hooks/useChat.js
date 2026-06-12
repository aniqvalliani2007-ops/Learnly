import { useState } from 'react'
import { supabase } from '../lib/supabase'

export const useChat = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = async (uploadId, message) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: functionError } = await supabase.functions.invoke('chat-with-pdf', {
        body: { uploadId, message }
      })

      if (functionError) throw functionError
      return data
    } catch (err) {
      setError(err.message)
      console.error('Chat error:', err)
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading, error }
}
