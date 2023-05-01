import * as I from 'model'

export const getPuzzleStats = (setPuzzles: I.SetPuzzle[]) => {
  const correctPuzzles = setPuzzles.filter(p => p.solved === true).length
  const setSize = setPuzzles.filter(p => p.played === true).length
  const solvedPct = Math.round((correctPuzzles / setSize) * 100)
  const ratingSum = setPuzzles.reduce((total, current) => total + current.rating, 0)
  const ratingAvg = Math.round(ratingSum / setPuzzles.length)
  const dp = (800 * solvedPct) / 100 - 400
  const ratingPerformance = dp + ratingAvg

  return { correctPuzzles, setSize, solvedPct, ratingAvg, ratingPerformance }
}
