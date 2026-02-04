import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const quoteApi = {
  // Get quote of the day
  getQuoteOfTheDay: async () => {
    const response = await axios.get(`${API_URL}/api/quote-of-the-day`)
    return response.data
  },

  // Get statistics
  getStats: async () => {
    const response = await axios.get(`${API_URL}/api/stats`)
    return response.data
  },

  // Reset all quotes
  resetQuotes: async () => {
    const response = await axios.post(`${API_URL}/api/reset-quotes`)
    return response.data
  }
}
