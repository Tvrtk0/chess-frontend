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

  if (isServer) return null
  return (
    <nav className="px-4 py-2.5 md:py-0 bg-stone-800">
      <div className="container flex flex-wrap items-center justify-between xl:justify-around mx-auto">
        <Link href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap">Woodpecker</span>
        </Link>
        <button
          type="button"
          onClick={() => handleOnClick()}
          className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-stone-400 hover:bg-stone-700 focus:ring-stone-600"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            ></path>
          </svg>
        </button>

        <div className={`${isOpen || isMd ? 'block' : 'hidden'} ${isMd ? 'w-auto' : 'w-full'}`} id="navbar-default">
          <ul
            className={`flex rounded-lg  bg-stone-900 md:bg-stone-800 border-stone-700 ${
              isMd ? 'flex-row mt-0 text-sm font-medium border-0' : 'flex-col border mt-4'
            }`}
          >
            {session ? (
              <>
                <NavbarItem onClick={() => handleOnClick()} href="/">
                  Home
                </NavbarItem>
                <NavbarItem onClick={() => handleOnClick()} href="/chess">
                  Puzzles
                </NavbarItem>
                <NavbarItem onClick={() => handleOnClick()} href="/stats">
                  Statistics
                </NavbarItem>
                <UserDropdown username={session.user?.name || 'Profile'} />
              </>
            ) : (
              <NavbarItem onClick={() => handleOnClick()} href="/login">
                Sign in
              </NavbarItem>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
