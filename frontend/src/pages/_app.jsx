import { Playfair_Display, Inter } from 'next/font/google'
import '../styles/globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function App({ Component, pageProps }) {
  return (
    <div className={`${playfair.variable} ${inter.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}
