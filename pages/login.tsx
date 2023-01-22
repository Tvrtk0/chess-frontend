import React from 'react'
import { getSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import { NextPageContext } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'
import Image from 'next/image'
import ChessPlayersImage from '@/public/assets/img/chess-players.jpg'
import GoogleSignIn from 'components/GoogleSignIn/GoogleSignIn'

type Props = { providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null }

export default function Login({ providers }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 mt-24 py-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center px-6">
          Sign up to start your <span className="text-indigo-500">Chess Training</span>
        </h1>
        <Image src={ChessPlayersImage} alt="Honoré Daumier (1863), The Chess Players" width={600} height={465} />
      </div>
      <GoogleSignIn googleProvider={providers?.google} />
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req })
  if (session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
