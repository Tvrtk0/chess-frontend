import RatingColor from 'components/RatingColor/RatingColor'
import Themes from 'components/Themes'
import { routes } from 'config'
import * as I from 'model'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import useSWR from 'swr'
import { getPuzzleStats } from 'utils/Stats'

export const StatsRow = ({ name, children }: { name: string; children: ReactNode }) => {
  return (
    <div className="mb-3 flex h-10 w-full max-w-md items-center justify-between">
      <div>{name}</div>
      <div>{children}</div>
    </div>
  )
}

export default function Statistics() {
  const { data: session } = useSession()
  const email = session?.user?.email ?? ''
  const { data: sets } = useSWR<I.Set[]>(routes.puzzleSetsAPI(email))

  if (!sets) return null

  const allPuzzlesSet = sets.reduce((arr, set) => arr.concat(set.setPuzzles), new Array<I.SetPuzzle>())
  console.log(allPuzzlesSet)

  const { correctPuzzles, setSize, solvedPct, ratingAvg, ratingPerformance } = getPuzzleStats(allPuzzlesSet)

  return (
    <div>
      <div className="mb-14 mt-10 text-center">
        <h2>Puzzles Statistics</h2>
      </div>
      <section className="mb-10 flex flex-col items-center">
        <StatsRow name="Solved">
          {correctPuzzles} / {setSize}
        </StatsRow>
        <StatsRow name="Solved Percent">{solvedPct}%</StatsRow>
        <StatsRow name="Avg. Rating">
          <div className="flex items-center">
            <RatingColor size="sm" rating={ratingAvg} />
            <p className="ml-3 font-bold">{ratingAvg}</p>
          </div>
        </StatsRow>
        <StatsRow name="Rating Performance">
          <div className="flex items-center">
            <RatingColor size="sm" rating={ratingPerformance} />
            <p className="ml-3 font-bold">{ratingPerformance}</p>
          </div>
        </StatsRow>
      </section>
      <section className="mb-20">
        <Themes setPuzzles={allPuzzlesSet} />
      </section>
    </div>
  )
}

// const sumWithInitial = array1.reduce(
//     (accumulator, currentValue) => accumulator + currentValue,
//     initialValue
//   );
