import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { useIsServer } from 'utils/hooks/useIsServer'
import { useMediaQuery } from 'utils/hooks/useMediaQuery'
import NavbarItem from './NavbarItem'
import UserDropdown from './UserDropdown'

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { data: session } = useSession()
  const isServer = useIsServer()
  const isMd = useMediaQuery('md')
  const handleOnClick = () => {
    if (!isMd) setIsOpen(o => !o)
  }

  if (isServer) return <div className="h-[60px] bg-stone-800"></div>
  return (
    <nav className="bg-stone-800 px-4 py-2.5 md:py-0">
      <div className="container mx-auto flex flex-wrap items-center justify-between xl:justify-around">
        <Link href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold">Woodpecker</span>
        </Link>
        <button
          type="button"
          onClick={() => handleOnClick()}
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-stone-400 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-600 md:hidden"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            ></path>
          </svg>
        </button>

        <div className={`${isOpen || isMd ? 'block' : 'hidden'} ${isMd ? 'w-auto' : 'w-full'}`} id="navbar-default">
          <ul
            className={`flex rounded-lg  border-stone-700 bg-stone-900 md:bg-stone-800 ${
              isMd ? 'mt-0 flex-row border-0 text-sm font-medium' : 'mt-4 flex-col border'
            }`}
          >
            {session ? (
              <>
                <NavbarItem onClick={() => handleOnClick()} href="/">
                  Home
                </NavbarItem>
                <NavbarItem onClick={() => handleOnClick()} href="/puzzles">
                  Puzzles
                </NavbarItem>
                <NavbarItem onClick={() => handleOnClick()} href="/stats">
                  Statistics
                </NavbarItem>
                <UserDropdown username={session.user?.name || 'Profile'} />
              </>
            ) : (
              <>
                <NavbarItem onClick={() => handleOnClick()} href="/">
                  Home
                </NavbarItem>
                <NavbarItem onClick={() => handleOnClick()} href="/login">
                  Sign in
                </NavbarItem>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
