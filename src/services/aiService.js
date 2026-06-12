import { supabase } from '../lib/supabase'

export const aiService = {
  async analyzePDF(uploadId) {
    const { data, error } = await supabase.functions.invoke('analyze-pdf', {
      body: { uploadId }
    })

    if (error) throw error
    return data
  },

  async generateQuiz(uploadId, numberOfQuestions = 10) {
    const { data, error } = await supabase.functions.invoke('generate-quiz', {
      body: { uploadId, numberOfQuestions }
    })

    if (error) throw error
    return data
  },

  async generateFlashcards(uploadId, numberOfCards = 20) {
    const { data, error } = await supabase.functions.invoke('generate-flashcards', {
      body: { uploadId, numberOfCards }
    })

    if (error) throw error
    return data
  },

  async chatWithPDF(uploadId, message) {
    const { data, error } = await supabase.functions.invoke('chat-with-pdf', {
      body: { uploadId, message }
    })

    if (error) throw error
    return data
  },
}
