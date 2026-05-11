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
  title: 'Jacques Fath Paris — Haute Couture',
  description: 'Since 1937, Jacques Fath has embodied Parisian sophistication and a pioneering spirit. Discover the story of a visionary couturier who shaped modern elegance.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
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
