import { ClientSafeProvider, signIn } from 'next-auth/react'
import React from 'react'

export default function GoogleSignIn({ googleProvider }: { googleProvider?: ClientSafeProvider }) {
  if (!googleProvider) return null
  return (
    <button
      className="rounded-md pl-1 pr-3 py-1 text-neutral-600 bg-stone-200 hover:bg-stone-300"
      onClick={() => signIn(googleProvider.id)}
    >
      <div className="flex items-center">
        <div className="p-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google logo" />
        </div>
        <div>Continue with {googleProvider.name}</div>
      </div>
    </button>
  )
}