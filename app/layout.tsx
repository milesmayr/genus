import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Genus — Your genius. Finally earning.',
  description:
    'Genus is where the world\'s sharpest minds protect their thinking, deploy it at scale, and actually get paid for it.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className="min-h-full antialiased overflow-x-hidden"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        <Nav />
        {children}
      </body>
    </html>
  )
}
