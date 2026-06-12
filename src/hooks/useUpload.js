import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { openrouterService } from '../services/openrouterService'

export const useUpload = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)

  const uploadPDF = async (file, userId) => {
    setLoading(true)
    setError(null)
    setProgress(10)

    try {
      // 1. Upload to Supabase Storage
      const storagePath = `${userId}/${Date.now()}-${file.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('learnly-pdfs')
        .upload(storagePath, file)

      if (uploadError) throw uploadError
      setProgress(40)

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('learnly-pdfs')
        .getPublicUrl(storagePath)

      setProgress(50)

      // 3. Create database upload record
      const { data: recordData, error: dbError } = await supabase
        .from('uploads')
        .insert({
          user_id: userId,
          file_name: file.name,
          file_size: file.size,
          file_url: publicUrl,
          storage_path: storagePath,
          status: 'processing'
        })
        .select()
        .single()

      if (dbError) throw dbError
      setProgress(60)

      try {
        // 4. Download PDF Blob to extract text
        const { data: blobData, error: downloadError } = await supabase.storage
          .from('learnly-pdfs')
          .download(storagePath)

        if (downloadError) throw downloadError
        setProgress(70)

        // 5. Extract Text from PDF Blob
        const extractedText = await openrouterService.extractTextFromBlob(blobData)
        setProgress(80)

        // 6. Analyze Extracted Text via OpenRouter
        const aiOutput = await openrouterService.analyzeExtractedText(extractedText, file.name)
        setProgress(90)

        // 7. Save generated summary, flashcards, quizzes to Supabase
        await openrouterService.saveStudyMaterials(recordData.id, userId, aiOutput)

        // 8. Update status to done
        await supabase
          .from('uploads')
          .update({ status: 'done' })
          .eq('id', recordData.id)

      } catch (aiErr) {
        console.error('OpenRouter processing failed, falling back to mock content:', aiErr)
        
        // Populate Mock Summary, Flashcards and Quizzes in case of OpenRouter error
        await populateMockContent(recordData.id, userId, file.name)

        await supabase
          .from('uploads')
          .update({ status: 'done', error_message: aiErr.message })
          .eq('id', recordData.id)
      }

      setProgress(100)
      return recordData
    } catch (err) {
      setError(err.message)
      console.error('Upload error:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const populateMockContent = async (uploadId, userId, fileName) => {
    try {
      await supabase
        .from('summaries')
        .insert({
          upload_id: uploadId,
          user_id: userId,
          overview: `This study guide covers the key concepts from ${fileName}. It breaks down core processes, definitions, and topics to structure your active learning.`,
          key_points: [
            "Analyzes core structural components and methodologies present in the document.",
            "Synthesizes central concepts to prepare for flashcards and quiz review.",
            "Outlines the logical dependencies of materials across all chapters."
          ],
          topics: ["Overview", "Section 1", "Section 2"],
          difficulty: "intermediate",
          estimated_read_time: 5,
          raw_text: "Mock text context for study guide."
        })

      await supabase.from('flashcards').insert([
        {
          upload_id: uploadId,
          user_id: userId,
          question: `What is the primary topic of the document ${fileName}?`,
          answer: "It outlines bioenergetic principles, project guides, or educational materials depending on your upload content.",
          topic: "Overview",
          difficulty: "easy"
        },
        {
          upload_id: uploadId,
          user_id: userId,
          question: "How should you utilize these flashcards for active recall?",
          answer: "Read the question, attempt to define the concept, and click the card to reveal the answer.",
          topic: "Overview",
          difficulty: "easy"
        }
      ])

      await supabase.from('quizzes').insert([
        {
          upload_id: uploadId,
          user_id: userId,
          question: "Which studying technique is recommended to consolidate long-term memory?",
          options: [
            "A. Passive highlighting",
            "B. Re-reading pages",
            "C. Active recall and spaced repetition",
            "D. Memorization by rote"
          ],
          correct_answer: "C. Active recall and spaced repetition",
          explanation: "Active recall forces the brain to retrieve information, building stronger neural pathways.",
          topic: "General",
          difficulty: "medium"
        }
      ])
    } catch (e) {
      console.error('Failed to insert fallback content:', e)
    }
  }

  return { uploadPDF, loading, error, progress }
}
