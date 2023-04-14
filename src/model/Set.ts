export interface SetPuzzle {
  puzzleId: string
  rating: number
  themes: string
  played: boolean
  solved: boolean
}

export interface Set {
  _id: string
  setPuzzles: SetPuzzle[]
  solvingTime: number[]
  timesPlayed: number
  createdAt: string
  updatedAt: string
}
