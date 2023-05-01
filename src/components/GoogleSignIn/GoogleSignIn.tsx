import { ClientSafeProvider, signIn } from 'next-auth/react'
import React from 'react'

export default function GoogleSignIn({ googleProvider }: { googleProvider?: ClientSafeProvider }) {
  if (!googleProvider) return null
  return (
    <button
      className="rounded-md bg-stone-200 py-1 pl-1 pr-3 text-neutral-600 hover:bg-stone-300"
      onClick={() => signIn(googleProvider.id)}
    >
      <div className="flex items-center">
        <div className="max-w-[40px] p-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google logo" />
        </div>
        <div>Continue with {googleProvider.name}</div>
      </div>
    </button>
  )
}
