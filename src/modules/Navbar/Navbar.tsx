import React from 'react'
import NavbarItem from './NavbarItem'

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <nav className="px-4 py-2.5 md:py-0 bg-stone-800">
      <div className="container flex flex-wrap items-center justify-between xl:justify-around mx-auto">
        <a className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Woodpecker</span>
        </a>
        <button
          type="button"
          onClick={() => setIsOpen(o => !o)}
          className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-stone-400 hover:bg-stone-700 focus:ring-stone-600"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            ></path>
          </svg>
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul
            className="flex flex-col mt-4 border rounded-lg md:flex-row md:mt-0 md:text-sm md:font-medium md:border-0 bg-stone-900 md:bg-stone-800 border-stone-700"
            onClick={() => setIsOpen(o => !o)}
          >
            <NavbarItem href="/chess">Puzzles</NavbarItem>
            <NavbarItem href="/">Statistics</NavbarItem>
            <NavbarItem href="/">Profile</NavbarItem>
          </ul>
        </div>
      </div>
    </nav>
  )
}
