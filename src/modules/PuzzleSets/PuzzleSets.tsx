import RatingColor from 'components/RatingColor'
import { routes } from 'config'
import { Set } from 'model/Set'
import { useSession } from 'next-auth/react'
import { Dispatch, SetStateAction, useState } from 'react'
import useSWR from 'swr'
import { useMediaQuery } from 'utils/hooks/useMediaQuery'
import { PuzzleSetTabs } from './interface'
import PuzzleSetItem from './PuzzleSetItem'

// TODO implement tabs with enum from ./interface
const PuzzleSetTab = (activeTab: PuzzleSetTabs, setActiveTab: Dispatch<SetStateAction<PuzzleSetTabs>>) => {
  return <button className="tab tab-active">Created at</button>
}

export default function PuzzleSets() {
  const isSm = useMediaQuery('sm')
  const [activeTab, setActiveTab] = useState<PuzzleSetTabs>(PuzzleSetTabs.CreatedAt)
  const { data: session } = useSession()
  const email = session?.user?.email ?? ''
  const { data: sets } = useSWR<Set[]>(routes.puzzleSetsAPI(email))

  return (
    <section className="mt-5 px-3">
      {/* TODO popup to choose set size and avg. rating for new set */}
      <div className="mb-7 flex w-full flex-wrap items-end gap-1 md:flex-nowrap">
        <div className="mb-1.5 mr-5 w-56">
          <button className="btn btn-primary">
            <span className="mr-2.5 text-xl">+</span>
            <span className="text-sm text-stone-50">New Puzzle Set</span>
          </button>
        </div>

        <div className="w-full text-sm">
          <div>Rating tiers:</div>
          <div className="flex w-full gap-3 overflow-x-auto whitespace-nowrap">
            <RatingColor size="md" rating={100} />
            <RatingColor size="md" rating={900} />
            <RatingColor size="md" rating={1300} />
            <RatingColor size="md" rating={1600} />
            <RatingColor size="md" rating={1800} />
            <RatingColor size="md" rating={2000} />
            <RatingColor size="md" rating={2200} />
            <RatingColor size="md" rating={2500} />
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto whitespace-nowrap py-4">
        <button className="tab tab-active">Created at</button>
        <button className="tab tab-default">Recent</button>
        <button className="tab tab-default">Difficulty</button>
        <button className="tab tab-default">Size</button>
        <button className="tab tab-default">In progress</button>
      </div>

      <div className={`flex flex-wrap gap-3 sm:justify-start ${isSm ? 'justify-start' : 'justify-center'}`}>
        {sets?.length && sets.map((set, i) => <PuzzleSetItem key={`${i}-${set._id}`} set={set} />)}
      </div>
    </section>
  )
}
