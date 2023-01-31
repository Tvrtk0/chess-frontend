import Link from 'next/link'
import React from 'react'

type Props = { href: string; onClick?: React.MouseEventHandler<HTMLLIElement>; children: React.ReactNode }

export default function NavbarItem({ href, onClick, children }: Props) {
  return (
    <li onClick={onClick}>
      <Link
        href={href}
        className="block select-none rounded-lg py-3 px-4 text-stone-400 hover:bg-stone-900 hover:text-white md:border-0 md:py-5 md:px-3 md:hover:bg-transparent md:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}
