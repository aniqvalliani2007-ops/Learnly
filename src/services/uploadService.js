import { supabase } from '../lib/supabase'

export const uploadService = {
  async uploadFile(file, userId) {
    const fileName = `${userId}/${Date.now()}-${file.name}`
    
    const { data, error } = await supabase.storage
      .from('learnly-pdfs')
      .upload(fileName, file)

    if (error) throw error
    return data
  },

  async createUploadRecord(userId, fileName, fileSize, storagePath) {
    const { data: { publicUrl } } = supabase.storage
      .from('learnly-pdfs')
      .getPublicUrl(storagePath)

    const { data, error } = await supabase
      .from('uploads')
      .insert({
        user_id: userId,
        file_name: fileName,
        file_size: fileSize,
        storage_path: storagePath,
        file_url: publicUrl,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getUploads(userId) {
    const { data, error } = await supabase
      .from('uploads')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async deleteUpload(uploadId) {
    const { error } = await supabase
      .from('uploads')
      .delete()
      .eq('id', uploadId)

    if (error) throw error
  },
}
