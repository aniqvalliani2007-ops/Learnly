import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { openrouterService } from '../services/openrouterService'

export const useUpload = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)

  // Returns the lifetime upload count for a user (never decreases on delete)
  const getLifetimeUploadCount = async (userId) => {
    const { data, error } = await supabase
      .from('user_upload_counts')
      .select('total_uploads')
      .eq('user_id', userId)
      .maybeSingle()
    if (error) throw error
    return data?.total_uploads ?? 0
  }

  const uploadPDF = async (file, userId) => {
    setLoading(true)
    setError(null)
    setProgress(10)

    try {
      // Check lifetime upload count — enforce 3 upload free limit
      const lifetimeCount = await getLifetimeUploadCount(userId)

      if (lifetimeCount >= 3) {
        throw new Error('UPLOAD_LIMIT_REACHED')
      }

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

      // Increment lifetime upload counter (never decrements on delete)
      await supabase.rpc('increment_upload_count', { p_user_id: userId })

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
            "Outlines the logical dependencies of materials across all chapters.",
            "Provides comprehensive coverage of essential learning objectives.",
            "Structures information for optimal retention and understanding."
          ],
          topics: ["Overview", "Section 1", "Section 2", "Key Concepts"],
          difficulty: "intermediate",
          estimated_read_time: 8,
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
          topic: "Study Methods",
          difficulty: "easy"
        },
        {
          upload_id: uploadId,
          user_id: userId,
          question: "What is spaced repetition?",
          answer: "A learning technique that involves reviewing material at increasing intervals to improve long-term retention.",
          topic: "Learning Strategies",
          difficulty: "medium"
        },
        {
          upload_id: uploadId,
          user_id: userId,
          question: "Why is active recall more effective than passive reading?",
          answer: "Active recall forces the brain to retrieve information, strengthening neural pathways and improving memory consolidation.",
          topic: "Cognitive Science",
          difficulty: "medium"
        }
      ])

      const quizQuestions = [
        {
          question: "Which studying technique is recommended to consolidate long-term memory?",
          options: ["A. Passive highlighting", "B. Re-reading pages", "C. Active recall and spaced repetition", "D. Memorization by rote"],
          correct_answer: "C. Active recall and spaced repetition",
          explanation: "Active recall forces the brain to retrieve information, building stronger neural pathways.",
          topic: "Study Techniques",
          difficulty: "medium"
        },
        {
          question: "What is the main benefit of using flashcards for studying?",
          options: ["A. They look organized", "B. They promote active recall", "C. They are easy to make", "D. They save paper"],
          correct_answer: "B. They promote active recall",
          explanation: "Flashcards force you to actively retrieve information, which strengthens memory.",
          topic: "Learning Tools",
          difficulty: "easy"
        },
        {
          question: "How often should you review material using spaced repetition?",
          options: ["A. Every day at the same time", "B. Only before exams", "C. At increasing intervals over time", "D. Once a week"],
          correct_answer: "C. At increasing intervals over time",
          explanation: "Spaced repetition works by reviewing material at progressively longer intervals to optimize retention.",
          topic: "Study Scheduling",
          difficulty: "medium"
        },
        {
          question: "What percentage of information do students typically retain when using active learning methods?",
          options: ["A. 10-20%", "B. 30-40%", "C. 50-70%", "D. 80-90%"],
          correct_answer: "C. 50-70%",
          explanation: "Research shows active learning methods like practice testing can improve retention to 50-70%.",
          topic: "Learning Science",
          difficulty: "hard"
        },
        {
          question: "Which part of the brain is primarily responsible for forming new memories?",
          options: ["A. Cerebellum", "B. Hippocampus", "C. Amygdala", "D. Frontal lobe"],
          correct_answer: "B. Hippocampus",
          explanation: "The hippocampus plays a crucial role in forming and retrieving declarative memories.",
          topic: "Neuroscience",
          difficulty: "hard"
        },
        {
          question: "What is the 'forgetting curve' concept?",
          options: ["A. A graph showing memory decay over time", "B. A study schedule", "C. A type of learning disability", "D. A testing method"],
          correct_answer: "A. A graph showing memory decay over time",
          explanation: "The forgetting curve, discovered by Ebbinghaus, shows how information is lost over time without reinforcement.",
          topic: "Memory Theory",
          difficulty: "medium"
        },
        {
          question: "What does 'metacognition' refer to in learning?",
          options: ["A. Learning about cognition", "B. Thinking about your own thinking", "C. Group studying", "D. Memory techniques"],
          correct_answer: "B. Thinking about your own thinking",
          explanation: "Metacognition involves awareness and understanding of one's own thought processes and learning strategies.",
          topic: "Learning Psychology",
          difficulty: "medium"
        },
        {
          question: "Which study environment is generally most effective?",
          options: ["A. Quiet and distraction-free", "B. With background music", "C. In groups only", "D. While multitasking"],
          correct_answer: "A. Quiet and distraction-free",
          explanation: "Research consistently shows that quiet, focused environments lead to better comprehension and retention.",
          topic: "Study Environment",
          difficulty: "easy"
        },
        {
          question: "How long should an optimal study session last?",
          options: ["A. 10-15 minutes", "B. 25-50 minutes", "C. 2-3 hours", "D. As long as possible"],
          correct_answer: "B. 25-50 minutes",
          explanation: "Studies show focused sessions of 25-50 minutes followed by breaks are most effective for learning.",
          topic: "Time Management",
          difficulty: "medium"
        },
        {
          question: "What is the Pomodoro Technique?",
          options: ["A. A cooking method", "B. A time management method using 25-minute intervals", "C. A memory palace technique", "D. A note-taking system"],
          correct_answer: "B. A time management method using 25-minute intervals",
          explanation: "The Pomodoro Technique uses 25-minute focused work intervals followed by short breaks to maintain productivity.",
          topic: "Productivity",
          difficulty: "easy"
        }
      ]

      await supabase.from('quizzes').insert(
        quizQuestions.map(q => ({
          upload_id: uploadId,
          user_id: userId,
          ...q
        }))
      )
    } catch (e) {
      console.error('Failed to insert fallback content:', e)
    }
  }

  return { uploadPDF, loading, error, progress, getLifetimeUploadCount }
}
