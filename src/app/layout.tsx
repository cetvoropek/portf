import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Developer & Founder | Building Real Systems',
  description: 'A developer-founder who builds serious products. Fleet compliance platforms, AI-assisted recruiting, business analytics, and behavioral design apps.',
  keywords: ['developer', 'founder', 'software engineer', 'product design', 'systems thinking'],
  authors: [{ name: 'Developer' }],
  openGraph: {
    title: 'Developer & Founder | Building Real Systems',
    description: 'A developer-founder who builds serious products, not hobby projects.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer & Founder | Building Real Systems',
    description: 'A developer-founder who builds serious products, not hobby projects.',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f7' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
