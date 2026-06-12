import { supabase } from '../lib/supabase'

export const quizService = {
  async getQuizzes(uploadId) {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('upload_id', uploadId)

    if (error) throw error
    return data
  },

  async createQuiz(uploadId, questions) {
    const { data, error } = await supabase
      .from('quizzes')
      .insert({
        upload_id: uploadId,
        questions,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async submitQuizAnswer(quizId, questionId, selectedAnswer) {
    const { data, error } = await supabase
      .from('quiz_answers')
      .insert({
        quiz_id: quizId,
        question_id: questionId,
        selected_answer: selectedAnswer,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },
}
