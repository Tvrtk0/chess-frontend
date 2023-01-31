import React, { ReactNode } from 'react'

interface DropdownProps {
  title: string
  children: ReactNode
}

export default function Dropdown({ title, children }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef(null)

  React.useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      // @ts-ignore
      if (isOpen && dropdownRef && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('click', onOutsideClick)
    return () => document.removeEventListener('click', onOutsideClick)
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(o => !o)}
        className={`cursor-pointer rounded py-3 px-4 hover:text-white md:border-0 md:py-5 md:px-3 ${
          isOpen ? 'text-white' : 'text-stone-400'
        }`}
      >
        <div className="flex h-auto select-none items-center">
          {title}
          <svg className="mx-0.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} absolute left-0 z-10 mt-2 w-full`}>{children}</div>
    </div>
  )
}
