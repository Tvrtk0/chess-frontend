import { SetPuzzle } from 'model'

export const formattedTheme = (theme: string) => {
  const result = theme.replace(/([A-Z0-9])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export const getPlayedThemes = (setPuzzles: SetPuzzle[]) => {
  const themes = setPuzzles.map(p => {
    return { themes: p.themes.split(' '), isSolved: p.solved }
  })

  const playedThemesMap = new Map<string, { solved: number; failed: number }>()

  themes.forEach(current => {
    current.themes.forEach(theme => {
      const obj = playedThemesMap.get(theme) || { solved: 0, failed: 0 }

      if (current.isSolved) {
        obj.solved += 1
        playedThemesMap.set(theme, obj)
      } else {
        obj.failed += 1
        playedThemesMap.set(theme, obj)
      }
    })
  })

  return Array.from(playedThemesMap, ([name, puzzles]) => ({ name, puzzles })).sort((a, b) => {
    return (
      b.puzzles.solved / (b.puzzles.failed + b.puzzles.solved) -
      a.puzzles.solved / (a.puzzles.failed + a.puzzles.solved)
    )
  })
}
