import { useEffect, useState } from 'react'
import Head from 'next/head'
import QuoteCard from '../components/QuoteCard'
import ActionButtons from '../components/ActionButtons'
import ErrorMessage from '../components/ErrorMessage'
import Footer from '../components/Footer'
import { quoteApi } from '../services/api'

export default function Home() {
  const [quote, setQuote] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchQuote = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await quoteApi.getQuoteOfTheDay()
      setQuote(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch quote')
      console.error('Error fetching quote:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const data = await quoteApi.getStats()
      setStats(data)
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  const handleNewQuote = async () => {
    await fetchQuote()
    await fetchStats()
  }

  useEffect(() => {
    fetchQuote()
    fetchStats()
    
    // Cursor tracking - larger circle
    const handleMouseMove = (e) => {
      const cursorGlow = document.getElementById('cursor-glow')
      if (cursorGlow) {
        cursorGlow.style.left = `${e.clientX - 192}px`
        cursorGlow.style.top = `${e.clientY - 192}px`
      }
    }
    
    const mainContainer = document.getElementById('main-container')
    if (mainContainer) {
      mainContainer.addEventListener('mousemove', handleMouseMove)
    }
    
    return () => {
      if (mainContainer) {
        mainContainer.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>Quote-Time</title>
        <meta name="description" content="Get inspired with a new quote every day" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-[#30364F] relative overflow-hidden flex items-center justify-center p-4" id="main-container">
        {/* Cursor follower - large circle tracking mouse */}
        <div id="cursor-glow" className="pointer-events-none fixed w-96 h-96 rounded-full bg-gradient-radial from-[#E1D9BC]/30 via-[#ACBAC4]/15 to-transparent blur-3xl transition-all duration-200 ease-out" style={{left: '-192px', top: '-192px'}}></div>
        
        {/* Animated background with falling stars and flowers */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#30364F] via-[#2a2f47] to-[#3d4463]"></div>
          
          {/* Tree-like structures with light colors and breeze animation */}
          <div className="tree-branch" style={{left: '5%', bottom: '0', height: '70%', animationDelay: '0s'}}></div>
          <div className="tree-branch" style={{left: '15%', bottom: '0', height: '85%', animationDelay: '1.5s'}}></div>
          <div className="tree-branch" style={{left: '25%', bottom: '0', height: '60%', animationDelay: '3s'}}></div>
          <div className="tree-branch" style={{right: '20%', bottom: '0', height: '75%', animationDelay: '2s'}}></div>
          <div className="tree-branch" style={{right: '8%', bottom: '0', height: '90%', animationDelay: '0.5s'}}></div>
          <div className="tree-branch" style={{left: '40%', bottom: '0', height: '65%', animationDelay: '2.5s'}}></div>
          
          {/* Falling stars (dark shades) */}
          <div className="star" style={{left: '10%', animationDelay: '0s', animationDuration: '15s'}}></div>
          <div className="star" style={{left: '20%', animationDelay: '2s', animationDuration: '18s'}}></div>
          <div className="star" style={{left: '30%', animationDelay: '4s', animationDuration: '16s'}}></div>
          <div className="star" style={{left: '40%', animationDelay: '1s', animationDuration: '20s'}}></div>
          <div className="star" style={{left: '50%', animationDelay: '3s', animationDuration: '17s'}}></div>
          <div className="star" style={{left: '60%', animationDelay: '5s', animationDuration: '19s'}}></div>
          <div className="star" style={{left: '70%', animationDelay: '2.5s', animationDuration: '21s'}}></div>
          <div className="star" style={{left: '80%', animationDelay: '4.5s', animationDuration: '16s'}}></div>
          <div className="star" style={{left: '90%', animationDelay: '1.5s', animationDuration: '18s'}}></div>
          <div className="star" style={{left: '15%', animationDelay: '6s', animationDuration: '22s'}}></div>
          <div className="star" style={{left: '85%', animationDelay: '3.5s', animationDuration: '19s'}}></div>
          
          {/* Falling flowers (light shades) */}
          <div className="flower" style={{left: '5%', animationDelay: '0s', animationDuration: '20s'}}></div>
          <div className="flower" style={{left: '25%', animationDelay: '3s', animationDuration: '22s'}}></div>
          <div className="flower" style={{left: '45%', animationDelay: '6s', animationDuration: '24s'}}></div>
          <div className="flower" style={{left: '65%', animationDelay: '2s', animationDuration: '21s'}}></div>
          <div className="flower" style={{left: '75%', animationDelay: '5s', animationDuration: '23s'}}></div>
          <div className="flower" style={{left: '35%', animationDelay: '4s', animationDuration: '25s'}}></div>
          <div className="flower" style={{left: '55%', animationDelay: '1s', animationDuration: '22s'}}></div>
          <div className="flower" style={{left: '95%', animationDelay: '7s', animationDuration: '20s'}}></div>
        </div>
        
        <div className="max-w-6xl w-full relative z-10">
          {/* Logo - CSS styled Quote-Time */}
          <div className="text-center mb-8 animate-fadeInDown">
            <div className="quote-time-logo">
              <span className="q-letter">
                Q
                <span className="golden-accent"></span>
              </span>
              <span className="remaining-text">uote–Time</span>
            </div>
          </div>
          
          {/* Main Quote Card */}
          <div className="relative bg-gradient-to-br from-[#30364F]/80 to-[#3d4463]/60 backdrop-blur-xl border border-[#ACBAC4]/20 shadow-2xl transform transition-all duration-700 hover:shadow-[#ACBAC4]/10 hover:shadow-3xl" style={{borderRadius: '1.5rem'}}>
            
            <div className="relative z-10">
              {error ? (
                <ErrorMessage error={error} />
              ) : (
                <QuoteCard quote={quote} loading={loading} />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <ActionButtons
            onNewQuote={handleNewQuote}
            loading={loading}
          />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}
