import { Inter } from '@next/font/google'
import Navbar from 'modules/Navbar'
import React from 'react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
