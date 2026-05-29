import type { Metadata } from 'next'
import { Mulish, Cinzel } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Mulish — основной текстовый шрифт
const mulish = Mulish({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mulish',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

// Cinzel — запасной шрифт для заголовков (если Trajan Pro 3 не загрузится)
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Maison Jacques Fath — Timeless French Elegance',
  description: 'Since 1937, Maison Jacques Fath has embodied the spirit of Parisian couture with boldness, refinement and vision. Discover the new collection.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className={`${mulish.variable} ${cinzel.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
