import React from 'react'
import { getSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import { NextPageContext } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'
import Image from 'next/image'
import ChessPlayersImage from '@/public/assets/img/chess-players.jpg'
import GoogleSignIn from 'components/GoogleSignIn'

type Props = { providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null }

export default function Login({ providers }: Props) {
  return (
    <div className="mt-14 flex flex-col items-center gap-8 py-4">
      <Image src={ChessPlayersImage} alt="Honoré Daumier (1863), The Chess Players" width={600} height={465} />
      <div className="flex flex-col items-center gap-6">
        <h1 className="px-6 text-center text-stone-400">
          Sign up to start your <span className="text-stone-300">Chess Training</span>
        </h1>
        <GoogleSignIn googleProvider={providers?.google} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req })
  if (session?.user) {
    return {
      redirect: {
        destination: '/puzzles',
        permanent: false,
      },
    }
  }
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
