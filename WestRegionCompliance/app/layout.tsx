import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SW Region Compliance Dashboard',
  description: 'Compliance metrics dashboard for Southwest Region',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900">
        {children}
      </body>
    </html>
  )
}
