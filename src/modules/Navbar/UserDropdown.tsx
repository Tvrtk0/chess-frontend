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
      className="block px-4 py-2 cursor-pointer text-stone-400 hover:text-white hover:bg-stone-700 select-none"
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
      <ul className="py-2 rounded-lg bg-stone-800">
        <DropdownItem onClick={() => signOut()}>Sign out</DropdownItem>
      </ul>
    </Dropdown>
  )
}
