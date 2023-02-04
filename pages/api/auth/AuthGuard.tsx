import React, { ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { routesMap } from 'config/routes'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  const loading = status === 'loading'
  const isUser = !!session?.user
  const isPublic = routesMap.public.includes(router.route)
  const isProtected = !isPublic && !isUser

  React.useEffect(() => {
    if (loading) return
    if (isProtected) router.push('/login')
  }, [isProtected, loading, router])

  if (isProtected) return null

  return <>{children}</>
}
