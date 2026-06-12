import axios from 'axios'

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
const OPENROUTER_API_URL = '/api/openrouter'

const openrouterClient = axios.create({
  baseURL: OPENROUTER_API_URL,
  headers: {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  }
})

export const callOpenRouter = async (messages, model = 'openrouter/auto') => {
  try {
    const response = await openrouterClient.post('/chat/completions', {
      model,
      messages,
      temperature: 0.7,
      max_tokens: 2048,
    })
    return response.data.choices[0].message.content
  } catch (error) {
    console.error('OpenRouter API Error:', error)
    throw error
  }
}

export default openrouterClient
