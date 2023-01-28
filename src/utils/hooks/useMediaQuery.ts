import React from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'

type Query = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export function useMediaQuery(q: Query): boolean {
  const tailwindConfig = require('tailwind.config')
  const config = resolveConfig(tailwindConfig)
  const breakpoints = config.theme?.screens
  const isSupported = typeof window !== 'undefined' && 'matchMedia' in window

  // @ts-ignore
  const query = `(min-width: ${breakpoints[q]})`
  const [matches, setMatches] = React.useState(isSupported ? !!window.matchMedia(query).matches : false)

  React.useEffect(() => {
    if (!isSupported) return undefined

    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [isSupported, query])

  return matches
}
