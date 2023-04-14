import RatingColor from 'components/RatingColor'
import { routes } from 'config'
import { Set } from 'model/Set'
import Link from 'next/link'

export default function PuzzleSetItem({ set }: { set: Set }) {
  const date = new Date(set.createdAt).toLocaleDateString()
  const ratingSum = set.setPuzzles.reduce((total, current) => total + current.rating, 0)
  const rating = Math.round(ratingSum / set.setPuzzles.length)
  const puzzlesDone = set.setPuzzles.filter(puzzle => puzzle.played === true).length
  const puzzlesTotal = set.setPuzzles.length
  // TODO add X for deleting set

  return (
    <Link href={routes.puzzleSet(set._id)}>
      <div className="flex-initial cursor-pointer rounded-lg bg-stone-800 py-4 px-6 text-center transition-colors duration-300 hover:bg-stone-700">
        <div className="flex flex-col">
          <div className="text-sm">
            {puzzlesDone}/{puzzlesTotal}
          </div>
          <RatingColor rating={rating} size="lg" />
          <div className="mt-1">{rating}</div>
          <div className="text-xs text-stone-400">{date}</div>
        </div>
      </div>
    </Link>
  )
}
