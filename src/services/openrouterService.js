import axios from 'axios'
import { supabase } from '../lib/supabase'

export const openrouterService = {
  // Extract text from a pdf blob using global window.pdfjsLib
  async extractTextFromBlob(blob) {
    if (!window.pdfjsLib) {
      throw new Error('PDF.js library is not loaded. Please verify the script tag in index.html.')
    }
    
    const arrayBuffer = await blob.arrayBuffer()
    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise
    
    let text = ''
    // Limit to first 10 pages for processing efficiency and token limits
    const pagesToRead = Math.min(pdf.numPages, 10)
    
    for (let i = 1; i <= pagesToRead; i++) {
      try {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        
        // Build text with better formatting
        let pageText = ''
        let lastY = null
        
        content.items.forEach((item, index) => {
          const currentY = item.transform[5]
          
          // Add line break if Y position changed significantly (new line)
          if (lastY !== null && Math.abs(currentY - lastY) > 5) {
            pageText += '\n'
          }
          
          // Add space between words on same line
          if (lastY === currentY && index > 0 && item.str.trim()) {
            pageText += ' '
          }
          
          pageText += item.str
          lastY = currentY
        })
        
        text += `\n\n═══ PAGE ${i} ═══\n\n${pageText.trim()}\n`
      } catch (pageErr) {
        console.error(`Error parsing page ${i}:`, pageErr)
      }
    }
    
    return text.trim() || 'No readable text content found in PDF.'
  },

  // Analyze the extracted text using OpenRouter with model fallbacks
  async analyzeExtractedText(text, fileName) {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
    if (!apiKey) {
      throw new Error('OpenRouter API key is missing. Please set VITE_OPENROUTER_API_KEY in .env.local')
    }

    const systemPrompt = `You are an AI study assistant. Analyze the text content of the uploaded document: "${fileName}".
Extract the core topics, and return a single JSON object containing:
1. "summary": { "overview": "A detailed paragraph summary summarizing main thesis/topics of this text", "key_points": ["Core point 1", "Core point 2", "Core point 3", "Core point 4", "Core point 5"], "estimated_read_time": 8, "difficulty": "intermediate", "topics": ["Topic A", "Topic B", "Topic C"] }
2. "flashcards": [ { "question": "Clear study question related to this text", "answer": "Clear study answer related to this text", "topic": "General", "difficulty": "medium" } ] (Return 6 to 8 flashcards covering different topics)
3. "quizzes": [ { "question": "Multiple choice question related to this text", "options": ["Option A", "Option B", "Option C", "Option D"], "correct_answer": "Option B", "explanation": "Detailed explanation of correct answer", "topic": "General", "difficulty": "medium" } ] (Return exactly 10 quiz questions with varying difficulty levels. Options MUST include the correct_answer string EXACTLY)

Ensure the response is strictly valid JSON with no markdown syntax wrapping (no \`\`\`json blocks), just the raw JSON object.`

    const userPrompt = `Document Text:\n${text.substring(0, 15000)}` // Cap context size to prevent token limits

    const modelsToTry = [
      'deepseek/deepseek-chat',
      'google/gemini-2.5-flash',
      'openrouter/auto',
      'openrouter/free'
    ]

    let responseData = null
    let lastError = null

    for (const model of modelsToTry) {
      try {
        console.log(`Attempting OpenRouter request with model: ${model}`)
        const response = await axios.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model: model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            max_tokens: 2500
          },
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': window.location.origin || 'https://learnly-teal.vercel.app',
              'X-Title': 'Learnly App'
            },
            timeout: 25000 // 25 seconds timeout per model attempt
          }
        )
        if (response.data?.choices?.[0]?.message?.content) {
          responseData = response.data.choices[0].message.content
          console.log(`OpenRouter request succeeded using model: ${model}`)
          break
        }
      } catch (err) {
        console.warn(`Model ${model} failed:`, err.message)
        lastError = err
      }
    }

    if (!responseData) {
      throw new Error('All model attempts failed: ' + (lastError ? lastError.message : 'Unknown error'))
    }

    // Parse the JSON object
    try {
      let cleaned = responseData.trim()
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```json\s*/, '').replace(/```$/, '').trim()
      }
      return JSON.parse(cleaned)
    } catch (e) {
      console.error('Failed to parse AI JSON:', responseData)
      throw new Error('Failed to parse JSON response from AI: ' + e.message)
    }
  },

  // Save the generated study guide content to Supabase
  async saveStudyMaterials(uploadId, userId, aiOutput) {
    const { summary, flashcards, quizzes } = aiOutput

    // 1. Insert Summary
    if (summary) {
      const { error: summaryErr } = await supabase
        .from('summaries')
        .insert({
          upload_id: uploadId,
          user_id: userId,
          overview: summary.overview || 'No overview generated.',
          key_points: summary.key_points || [],
          topics: summary.topics || [],
          difficulty: summary.difficulty || 'medium',
          estimated_read_time: summary.estimated_read_time || 5,
          raw_text: 'Processed'
        })
      if (summaryErr) console.error('Error saving summary:', summaryErr)
    }

    // 2. Insert Flashcards
    if (flashcards && flashcards.length > 0) {
      const cardsToInsert = flashcards.map(c => ({
        upload_id: uploadId,
        user_id: userId,
        question: c.question,
        answer: c.answer,
        topic: c.topic || 'General',
        difficulty: c.difficulty || 'medium'
      }))
      const { error: cardsErr } = await supabase.from('flashcards').insert(cardsToInsert)
      if (cardsErr) console.error('Error saving flashcards:', cardsErr)
    }

    // 3. Insert Quizzes
    if (quizzes && quizzes.length > 0) {
      const quizToInsert = quizzes.map(q => ({
        upload_id: uploadId,
        user_id: userId,
        question: q.question,
        options: q.options || [],
        correct_answer: q.correct_answer,
        explanation: q.explanation || '',
        topic: q.topic || 'General',
        difficulty: q.difficulty || 'medium'
      }))
      const { error: quizErr } = await supabase.from('quizzes').insert(quizToInsert)
      if (quizErr) console.error('Error saving quizzes:', quizErr)
    }
  },

  // Helper function to handle a message chat with context
  async chatResponse(fileName, contextText, message, messageHistory) {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
    if (!apiKey) {
      throw new Error('OpenRouter API key is missing. Please set VITE_OPENROUTER_API_KEY in .env.local')
    }

    const messages = [
      { 
        role: 'system', 
        content: `You are an AI study assistant for the document: "${fileName}".
Below is some context extracted from the document to help you answer questions accurately.
Context:\n${contextText.substring(0, 10000)}

Answer the student's question clearly, concisely, and with high educational value. Focus on helping them understand.` 
      }
    ]

    messageHistory.forEach(msg => {
      messages.push({ role: msg.role === 'user' ? 'user' : 'assistant', content: msg.content })
    })

    messages.push({ role: 'user', content: message })

    const modelsToTry = [
      'deepseek/deepseek-chat',
      'google/gemini-2.5-flash',
      'openrouter/auto',
      'openrouter/free'
    ]

    for (const model of modelsToTry) {
      try {
        const response = await axios.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model: model,
            messages: messages,
            max_tokens: 1000
          },
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': window.location.origin || 'https://learnly-teal.vercel.app',
              'X-Title': 'Learnly App'
            },
            timeout: 15000
          }
        )
        if (response.data?.choices?.[0]?.message?.content) {
          return response.data.choices[0].message.content
        }
      } catch (err) {
        console.warn(`Model ${model} failed for chat:`, err.message)
      }
    }

    return 'I apologize, I could not generate an answer at this moment.'
  }
}
