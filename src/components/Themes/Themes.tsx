import { SetPuzzle } from 'model'
import { formattedTheme, getPlayedThemes } from './utils'
import ProgressBar from 'components/ProgressBar/ProgressBar'

export default function Themes({ setPuzzles }: { setPuzzles: SetPuzzle[] }) {
  const playedThemes = getPlayedThemes(setPuzzles)

  return (
    <div className="w-full px-2">
      <div className="text-center">
        <h3>Themes</h3>
      </div>
      <ul className="mt-3 text-center">
        {playedThemes.map((theme, i) => {
          const puzzlesPlayed = theme.puzzles.failed + theme.puzzles.solved
          const solvedPct = Math.round((theme.puzzles.solved / puzzlesPlayed) * 100)

          return (
            <li key={`${i}-${theme}`} className="mb-7">
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <div className="flex justify-between px-1 text-sm">
                    <div className="mb-1 font-bold text-stone-50">{formattedTheme(theme.name)}</div>
                    <div className="text-stone-200">
                      {solvedPct}%
                      <span className="ml-2 text-stone-400">
                        ({theme.puzzles.solved}/{puzzlesPlayed})
                      </span>
                    </div>
                  </div>
                  <div className="mb-2 w-full">
                    <ProgressBar solvedPct={solvedPct} />
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
