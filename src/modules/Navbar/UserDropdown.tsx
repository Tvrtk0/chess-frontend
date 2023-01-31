import Dropdown from 'components/Dropdown'
import { signOut } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface DropdownItemProps {
  onClick?: React.MouseEventHandler<HTMLLIElement>
  children: ReactNode
}

const DropdownItem = ({ onClick, children }: DropdownItemProps) => {
  return (
    <li
      className="block cursor-pointer select-none px-4 py-2 text-stone-400 hover:bg-stone-700 hover:text-white"
      onClick={onClick}
    >
      {children}
    </li>
  )
}

export default function UserDropdown({ username }: { username: string }) {
  const ref = React.useRef()
  return (
    <Dropdown title={username}>
      <ul className="rounded-lg bg-stone-800 py-2">
        <DropdownItem onClick={() => signOut()}>Sign out</DropdownItem>
      </ul>
    </Dropdown>
  )
}
