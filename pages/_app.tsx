import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { swrConfig } from 'utils/Fetch'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={swrConfig}>
          <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  )
}
