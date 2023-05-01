import { Set } from 'model/Set'
import { KeyedMutator } from 'swr'
import { useMediaQuery } from 'utils/hooks/useMediaQuery'
import { FilterTabs, SortTabs } from './interface'
import PuzzleSetItem from './PuzzleSetItem'
import { getPuzzleStats } from 'utils/Stats'

interface Props {
  sets: Set[]
  mutateSets: KeyedMutator<Set[]>
  activeSortTab: SortTabs
  activeFilterTab: FilterTabs
}

const sortSets = (activeTab: SortTabs, sets: Set[]) => {
  switch (activeTab) {
    case SortTabs.CreatedAt:
      return sets.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
    case SortTabs.Recent:
      return sets.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
    case SortTabs.Difficulty:
      return sets.sort((a, b) =>
        getPuzzleStats(a.setPuzzles).ratingAvg > getPuzzleStats(b.setPuzzles).ratingAvg ? -1 : 1
      )
    case SortTabs.Size:
      return sets.sort((a, b) => (a.setPuzzles.length > b.setPuzzles.length ? -1 : 1))
    default:
      return sets
  }
}

const filterSets = (activeTab: FilterTabs, sets: Set[]) => {
  switch (activeTab) {
    case FilterTabs.InProgress:
      return sets.filter(set => set.setPuzzles.some(p => p.played === false))
    case FilterTabs.Done:
      return sets.filter(set => set.setPuzzles.every(p => p.played === true))
    default:
      return sets
  }
}

export default function PuzzleSets({ sets, mutateSets, activeSortTab, activeFilterTab }: Props) {
  const isSm = useMediaQuery('sm')
  return (
    <div className={`flex flex-wrap gap-3 sm:justify-start ${isSm ? 'justify-start' : 'justify-center'}`}>
      {sets?.length &&
        sortSets(activeSortTab, filterSets(activeFilterTab, sets)).map((set, i) => (
          <PuzzleSetItem key={`${i}-${set._id}`} set={set} mutateSets={mutateSets} />
        ))}
    </div>
  )
}
