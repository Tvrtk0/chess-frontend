const API_BASENAME = process.env.NEXT_PUBLIC_API_BASENAME

export const routesMap = {
  public: ['/', '/login'],
}

export const puzzles = () => '/puzzles'
export const puzzleSet = (id: string) => '/puzzles/set/' + id

export const puzzleAPI = (puzzleId: string) => API_BASENAME + '/puzzle/' + puzzleId
export const puzzleSetAPI = (setId: string) => API_BASENAME + '/sets/' + setId
export const puzzleSetUpdateAPI = (setId: string, puzzleId: string) => API_BASENAME + '/sets/' + setId + '/' + puzzleId
export const puzzleSetsAPI = (email: string) => API_BASENAME + '/sets/all/' + email
