import RatingColor from 'components/RatingColor'
import { routes } from 'config'
import { Set } from 'model/Set'
import { useSession } from 'next-auth/react'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import useSWR from 'swr'
import { FilterTabs, SortTabs } from './interface'
import { useRouter } from 'next/router'
import PuzzleSets from './PuzzleSets'

interface PuzzleSetTabProps {
  tab: SortTabs | FilterTabs
  activeTab: SortTabs | FilterTabs
  setActiveTab: Dispatch<SetStateAction<FilterTabs>> | Dispatch<SetStateAction<SortTabs>>
  children?: ReactNode
}

const PuzzleSetTab = ({ tab, activeTab, setActiveTab, children }: PuzzleSetTabProps) => {
  return (
    //@ts-ignore
    <button className={`tab ${tab === activeTab ? 'tab-active' : 'tab-default'}`} onClick={() => setActiveTab(tab)}>
      {children || tab}
    </button>
  )
}

export default function PuzzleSetsWrapper() {
  const router = useRouter()
  const { data: session } = useSession()
  const email = session?.user?.email ?? ''
  const { data: sets, mutate: mutateSets } = useSWR<Set[]>(routes.puzzleSetsAPI(email))
  const [activeSortTab, setActiveSortTab] = useState<SortTabs>(SortTabs.CreatedAt)
  const [activeFilterTab, setActiveFilterTab] = useState<FilterTabs>(FilterTabs.All)

  return (
    <section className="my-5 px-3 lg:px-40">
      <div className="mb-5 flex w-full flex-wrap items-end gap-1 md:flex-nowrap">
        <div className="mb-1.5 mr-5 w-56">
          <button className="btn btn-primary" onClick={() => router.push(routes.createSet())}>
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

      <div className="mt-2 flex gap-2 overflow-x-auto whitespace-nowrap py-2">
        {Object.values(FilterTabs).map((tabValue, i) => {
          return (
            <PuzzleSetTab
              key={`${i}-${tabValue}`}
              tab={tabValue}
              activeTab={activeFilterTab}
              setActiveTab={setActiveFilterTab}
            />
          )
        })}
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto whitespace-nowrap py-2">
        {Object.values(SortTabs).map((tabValue, i) => {
          return (
            <PuzzleSetTab
              key={`${i}-${tabValue}`}
              tab={tabValue}
              activeTab={activeSortTab}
              setActiveTab={setActiveSortTab}
            />
          )
        })}
      </div>

      {sets && (
        <PuzzleSets
          activeSortTab={activeSortTab}
          activeFilterTab={activeFilterTab}
          sets={sets}
          mutateSets={mutateSets}
        />
      )}
    </section>
  )
}
