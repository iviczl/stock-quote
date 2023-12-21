import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './reset.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stock Query App',
  description: 'Search for a stock and query its data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className + ' p-4 flex justify-center'}>
        {children}
      </body>
    </html>
  )
}
