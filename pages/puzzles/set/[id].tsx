import PuzzleBoard from 'components/PuzzleBoard'
import { routes } from 'config'
import * as I from 'model'
import FinishedSet from 'modules/FinishedSet'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function Set() {
  const router = useRouter()
  const { id } = router.query

  // @ts-ignore
  const { data: set, mutate } = useSWR<I.Set>(routes.puzzleSetAPI(id))
  const findNextPuzzle = () => set?.setPuzzles.find(p => p.played === false)
  const [activePuzzleId, setActivePuzzleId] = useState(findNextPuzzle())

  useEffect(() => {
    setActivePuzzleId(set?.setPuzzles.find(p => p.played === false))
  }, [set?.setPuzzles])

  if (!set) return null
  return (
    <div className="container mx-auto mt-10">
      {activePuzzleId && (
        <PuzzleBoard
          key={activePuzzleId.puzzleId}
          setId={set._id}
          puzzleId={activePuzzleId.puzzleId}
          mutateSet={mutate}
        />
      )}
      {set?.setPuzzles.find(p => p.played === false) === undefined && <FinishedSet set={set} mutateSet={mutate} />}
    </div>
  )
}
