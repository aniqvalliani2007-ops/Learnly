import { supabase } from '../lib/supabase'

export const progressService = {
  async getProgress(userId) {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async createProgress(userId) {
    const { data, error } = await supabase
      .from('progress')
      .insert({
        user_id: userId,
        uploads_count: 0,
        study_streak: 0,
        total_study_time: 0,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateProgress(userId, updates) {
    const { data, error } = await supabase
      .from('progress')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },
}
