import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Login() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <p>{session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={() => signIn()}>Sign in with Google</button>
      </div>
    )
  }
}
