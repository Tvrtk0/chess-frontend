import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from 'modules/Layout'
import { SWRConfig } from 'swr'
import { swrConfig } from 'utils/Fetch'
import AuthGuard from './api/auth/AuthGuard'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={swrConfig}>
        <Layout>
          <AuthGuard>
          <Component {...pageProps} />
          </AuthGuard>
        </Layout>
      </SWRConfig>
    </SessionProvider>
  )
}
