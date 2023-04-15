import { routes } from 'config'
import { Set } from 'model'
import { KeyedMutator } from 'swr'

export const deleteSet = (email: string, setId: string, rating?: number, mutateSets?: KeyedMutator<Set[]>) => {
  const msg = `Do you really want to delete this set${rating ? ` (Rating: ${rating})` : ''}?`

  if (window.confirm(msg)) {
    fetch(routes.deletePuzzleSetAPI(email, setId), { method: 'DELETE' }).then(() => mutateSets?.())
    return true
  }
  return false
}
