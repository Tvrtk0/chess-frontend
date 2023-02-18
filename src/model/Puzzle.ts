export interface Puzzle {
  fen: string
  gameUrl: string
  moves: string
  nbPlays: number
  openingFamily?: string
  openingVariation?: string
  popularity: number
  rating: number
  ratingDeviation: number
  themes: string
  puzzleId: string
  _id: string
}
