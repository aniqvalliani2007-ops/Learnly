import { supabase } from '../lib/supabase'

export const flashcardService = {
  async getFlashcards(uploadId) {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('upload_id', uploadId)

    if (error) throw error
    return data
  },

  async createFlashcards(uploadId, cards) {
    const { data, error } = await supabase
      .from('flashcards')
      .insert(
        cards.map(card => ({
          upload_id: uploadId,
          question: card.question,
          answer: card.answer,
        }))
      )
      .select()

    if (error) throw error
    return data
  },

  async deleteFlashcard(cardId) {
    const { error } = await supabase
      .from('flashcards')
      .delete()
      .eq('id', cardId)

    if (error) throw error
  },
}
