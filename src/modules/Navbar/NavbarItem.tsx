import Link from 'next/link'
import React from 'react'

type Props = { href: string; onClick?: React.MouseEventHandler<HTMLLIElement>; children: React.ReactNode }

export default function NavbarItem({ href, onClick, children }: Props) {
  return (
    <li onClick={onClick}>
      <Link
        href={href}
        className="block select-none py-3 px-4 rounded-lg md:border-0 md:py-5 md:px-3 text-stone-400 md:hover:text-white hover:bg-stone-900 hover:text-white md:hover:bg-transparent"
      >
        {children}
      </Link>
    </li>
  )
}
