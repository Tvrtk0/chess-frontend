import RatingColor from 'components/RatingColor'
import { routes } from 'config'
import { Set } from 'model/Set'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { KeyedMutator } from 'swr'
import { deleteSet } from './utils'

export default function PuzzleSetItem({ set, mutateSets }: { set: Set; mutateSets: KeyedMutator<Set[]> }) {
  const { data: session } = useSession()
  const email = session?.user?.email ?? ''
  const date = new Date(set.createdAt).toLocaleDateString()
  const ratingSum = set.setPuzzles.reduce((total, current) => total + current.rating, 0)
  const rating = Math.round(ratingSum / set.setPuzzles.length)
  const puzzlesDone = set.setPuzzles.filter(puzzle => puzzle.played === true).length
  const puzzlesTotal = set.setPuzzles.length

  return (
    <div className="relative">
      <Link href={routes.puzzleSet(set._id)}>
        <div className="flex-initial cursor-pointer rounded-lg bg-stone-800 py-4 px-10 pt-6 text-center transition-colors duration-300 hover:bg-stone-700">
          <div className="flex flex-col">
            <div className="text-sm">
              {puzzlesDone}/{puzzlesTotal}
            </div>
            <RatingColor rating={rating} size="lg" />
            <div className="mt-1 text-lg">{rating}</div>
            <div className="text-xs text-stone-400">{date}</div>
          </div>
        </div>
      </Link>
      <div
        className="absolute top-1 right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded hover:bg-stone-700"
        onClick={() => deleteSet(email, set._id, rating, mutateSets)}
      >
        <span className="select-none text-lg text-stone-400">&times;</span>
      </div>
    </div>
  )
}
