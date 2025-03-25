
import React from 'react'
import './globals.css'

export const metadata = {
  title: 'Jobify',
  description: 'Vagas de emprego remotas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-black">{children}</body>
    </html>
  )
}
