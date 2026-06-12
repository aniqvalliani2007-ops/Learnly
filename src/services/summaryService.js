import { supabase } from '../lib/supabase'

export const summaryService = {
  async getSummary(uploadId) {
    const { data, error } = await supabase
      .from('summaries')
      .select('*')
      .eq('upload_id', uploadId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async createSummary(uploadId, content) {
    const { data, error } = await supabase
      .from('summaries')
      .insert({
        upload_id: uploadId,
        content,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateSummary(uploadId, content) {
    const { data, error } = await supabase
      .from('summaries')
      .update({ content })
      .eq('upload_id', uploadId)
      .select()
      .single()

    if (error) throw error
    return data
  },
}
