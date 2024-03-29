import Head from 'next/head'
import HansTikkanenImage from '@/public/assets/img/HansTikkanen.jpg'
import AxelSmith from '@/public/assets/img/AxelSmith.jpg'
import Image from 'next/image'

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
        <h1 className="my-7 text-center lg:text-4xl">The Woodpecker Method</h1>
        <section className="mt-10 flex flex-col-reverse items-center justify-center gap-x-32 px-5 lg:flex-row">
          <div className="flex max-w-lg flex-col justify-center p-3">
            <div className="flex flex-col gap-y-3 text-lg leading-8">
              <h2>Ultimate Method for Improvers</h2>
              <p>
                The Woodpecker Method is the name given by Axel Smith to a training system developed by his compatriot
                and co-author Hans Tikkanen
              </p>
              <p>
                After training with his method in 2010, Tikkanen achieved three GM norms within a seven-week period.
              </p>
            </div>
          </div>
          <div className="my-5 flex max-w-sm flex-col items-center">
            <Image src={AxelSmith} alt="Axel Smith" width={420} height={420} />
            <p className="mt-2 italic text-stone-400">GM Axel Smith</p>
          </div>
        </section>

        <section className="mt-12 flex flex-col items-center justify-center gap-x-32 bg-stone-800 py-14 px-5 lg:flex-row">
          <div className="my-5 flex max-w-sm flex-col items-center">
            <Image src={HansTikkanenImage} alt="Hans Tikkanen" width={420} height={420} />
            <p className="mt-2 italic text-stone-400">GM Hans Tikkanen</p>
          </div>
          <div className="flex max-w-lg flex-col justify-center gap-y-5 text-lg leading-8">
            <h2>No shortcuts for success. Progress requires hard work!</h2>
            <p>
              The quick explanation of the Woodpecker Method is that you need to solve a large number of puzzles in a
              row; then solve the same puzzles again and again, only faster.
            </p>
            <p>
              It&#39;s not a lazy shortcut to success – hard work is required. But the reward can be re-programming your
              unconscious mind. Benefits include sharper tactical vision, fewer blunders, better play when in time
              trouble and improved intuition.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
