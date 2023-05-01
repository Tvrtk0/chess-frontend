import { useEffect, useState } from 'react'

export default function Calculator() {
  const [kFactor, setKFactor] = useState(20)
  const [score, setScore] = useState(0.5)
  const [rating, setRating] = useState<number>(0)
  const [opponentRating, setOpponentRating] = useState<number>(0)
  const [newRating, setNewRating] = useState(0)
  const [expectedScore, setExpectedScore] = useState(0)
  const ratingChange = Math.round(newRating - rating)
  const isValid = opponentRating > 0 && rating > 0

  useEffect(() => {
    if (!rating || !opponentRating) return

    const _expectedScore = 1 / (1 + Math.pow(10, (opponentRating - rating) / 400))
    const _newRating = rating + kFactor * (score - _expectedScore)

    setExpectedScore(Math.round(_expectedScore * 100) / 100)
    setNewRating(Math.round(_newRating * 10) / 10)
  }, [kFactor, opponentRating, rating, score])

  return (
    <div className="container mx-auto flex flex-row justify-center">
      <div className="mt-10 w-full max-w-sm rounded-lg bg-stone-800 p-5">
        <h1 className="mt-3 text-center">ELO Calculator</h1>
        <div className="mb-7 flex justify-center">
          <section className="mt-7 w-full">
            <div>
              <p className="mb-1">Rating</p>
              <input
                type="number"
                className="mb-4 w-full rounded-md px-3 py-1 text-black"
                onChange={e => setRating(+e.target.value)}
              />
            </div>

            <div className="mb-2">
              <p className="mb-1">Opponents Rating</p>
              <input
                type="number"
                className="mb-4 w-full rounded-md px-3 py-1 text-black"
                onChange={e => setOpponentRating(+e.target.value)}
              />
            </div>

            <div className="mb-5 flex w-full items-baseline justify-between">
              <p>K factor</p>
              <div className="flex justify-center gap-3">
                <button
                  className={`tab ${kFactor === 10 ? 'tab-active' : 'tab-default'}`}
                  onClick={() => setKFactor(10)}
                >
                  10
                </button>
                <button
                  className={`tab ${kFactor === 20 ? 'tab-active' : 'tab-default'}`}
                  onClick={() => setKFactor(20)}
                >
                  20
                </button>
                <button
                  className={`tab ${kFactor === 30 ? 'tab-active' : 'tab-default'}`}
                  onClick={() => setKFactor(30)}
                >
                  30
                </button>
                <button
                  className={`tab ${kFactor === 40 ? 'tab-active' : 'tab-default'}`}
                  onClick={() => setKFactor(40)}
                >
                  40
                </button>
              </div>
            </div>

            <div className="mb-5 flex justify-between">
              <p>Score</p>
              <div className="flex justify-center gap-3">
                <button className={`tab ${score === 1 ? 'tab-active' : 'tab-default'}`} onClick={() => setScore(1)}>
                  WIN
                </button>
                <button className={`tab ${score === 0.5 ? 'tab-active' : 'tab-default'}`} onClick={() => setScore(0.5)}>
                  DRAW
                </button>
                <button className={`tab ${score === 0 ? 'tab-active' : 'tab-default'}`} onClick={() => setScore(0)}>
                  LOSS
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="mb-2">
          <div className="mb-3 flex justify-between">
            <span>Expected Score:</span> {isValid ? <span>{expectedScore * 100}%</span> : '-'}
          </div>
          <div className="mb-3 flex justify-between">
            <span>Rating Change:</span>{' '}
            <span className="text-stone-400">
              {isValid ? (
                <>
                  <span className={`${ratingChange > 0 && 'text-green-500'} ${ratingChange < 0 && 'text-red-500'}`}>
                    {ratingChange > 0 && '+'}
                    {ratingChange}{' '}
                  </span>
                  ({newRating})
                </>
              ) : (
                <span className="text-stone-50">-</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
