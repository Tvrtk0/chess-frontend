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
        className={`cursor-pointer py-3 px-4 rounded md:border-0 md:py-5 md:px-3 hover:text-white ${
          isOpen ? 'text-white' : 'text-stone-400'
        }`}
      >
        <div className="flex items-center h-auto select-none">
          {title}
          <svg className="w-4 h-4 mx-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} absolute left-0 z-10 w-full mt-2`}>{children}</div>
    </div>
  )
}
