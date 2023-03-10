import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Woodpecker Chess</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="container m-auto">
          <div className="mt-40 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
          </div>
        </div>
      </div>
    </>
  )
}
