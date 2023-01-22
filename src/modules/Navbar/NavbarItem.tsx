import Link from 'next/link'
import React from 'react'

type Props = { href: string; children: React.ReactNode }

export default function NavbarItem({ href, children }: Props) {
  return (
    <li>
      <Link
        href={href}
        className="block py-3 px-4 rounded md:border-0 md:py-5 md:px-3 text-stone-400 md:hover:text-white hover:bg-stone-900 hover:text-white md:hover:bg-transparent"
      >
        {children}
      </Link>
    </li>
  )
}
