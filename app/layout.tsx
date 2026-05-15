import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  weight: ['300', '400', '500', '600', '700'],
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
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/trajan-pro-3"
          rel="stylesheet"
        />
      </head>
      <body className={`${mulish.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
