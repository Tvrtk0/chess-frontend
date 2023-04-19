import RatingColor from 'components/RatingColor/RatingColor'
import Themes from 'components/Themes/Themes'
import { routes } from 'config'
import { puzzles } from 'config/routes'
import { Set } from 'model'
import { deleteSet } from 'modules/PuzzleSets/utils'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { KeyedMutator } from 'swr'
import { getPuzzleStats } from 'utils/Stats'

export default function FinishedSet({ set, mutateSet }: { set: Set; mutateSet: KeyedMutator<Set> }) {
  const { data: session } = useSession()
  const email = session?.user?.email ?? ''
  const router = useRouter()

  const dateCreated = new Date(set.createdAt).toLocaleDateString()
  const { correctPuzzles, setSize, solvedPct, ratingAvg, ratingPerformance } = getPuzzleStats(set.setPuzzles)

  const resetSet = () => {
    if (window.confirm('Do you really want to reset this set?')) {
      fetch(routes.puzzleSetResetAPI(set._id), { method: 'PUT' }).then(() => mutateSet())
    }
  }

  const handleDelete = () => {
    if (deleteSet(email, set._id)) {
      router.push(puzzles())
    }
  }

  return (
    <section className="mb-10 px-3">
      <div className="mb-10 text-center">
        <h2>
          Set completed: {solvedPct}%{' '}
          <span className="text-stone-400">
            ({correctPuzzles}/{setSize})
          </span>
        </h2>
        <p className="text mt-1 text-stone-400">{dateCreated}</p>
      </div>
      <div className="mt-3 flex flex-col items-center">
        <div className="mb-10 flex w-full flex-col items-center p-2">
          <div className="mb-2 flex w-full max-w-md items-center justify-between">
            <p>Puzzles Avg. Rating: </p>
            <div className="flex items-center">
              <RatingColor size="sm" rating={ratingAvg} />
              <p className="ml-3 font-bold">{ratingAvg}</p>
            </div>
          </div>
          <div className="mb-2 flex w-full max-w-md items-center justify-between">
            <p>Rating Performance:</p>
            <div className="flex items-center">
              <RatingColor size="sm" rating={ratingPerformance} />
              <p className="ml-3 font-bold">{ratingPerformance}</p>
            </div>
          </div>
        </div>

        <Themes setPuzzles={set.setPuzzles} />

        <div className="mt-7 flex gap-2">
          <button className="btn btn-primary" onClick={() => router.push(puzzles())}>
            Go Back
          </button>
          <button className="btn btn-primary" onClick={handleDelete}>
            Delete Set
          </button>
          <button className="btn btn-primary" onClick={resetSet}>
            Restart Set
          </button>
        </div>
      </div>
    </section>
  )
}
