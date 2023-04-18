import Chessboard from 'components/Chessboard'
import { routes } from 'config'
import useSWR, { KeyedMutator } from 'swr'
import * as I from 'model'
import BoardPlaceholder from 'components/Chessboard/BoardPlaceholder'
import { ChessBoardRef, OnMoveBoard } from 'components/Chessboard/interface'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'utils/hooks/useMediaQuery'
import { makeMove } from 'components/Chessboard/utils'
import { PuzzleStatus } from './PuzzleStatus'
import { MoveHistory } from './MoveHistory'
import { useRouter } from 'next/router'
import { puzzles } from 'config/routes'

type Props = { setId: string; puzzleId: string; mutateSet: KeyedMutator<I.Set> }

const getSolutionMoves = (i: number, solution?: string[]) => {
  if (!solution || !solution[i]) return null
  return { from: solution[i].slice(0, 2), to: solution[i].slice(2) }
}

const updatePuzzle = (setId: string, puzzleId: string, isSolved: boolean) => {
  if (setId && puzzleId) {
    fetch(routes.puzzleSetUpdateAPI(setId, puzzleId), {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ solved: isSolved }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }
}

export default function PuzzleBoard({ setId, puzzleId, mutateSet }: Props) {
  const { data: puzzle } = useSWR<I.Puzzle>(routes.puzzleAPI(puzzleId || ''))
  const router = useRouter()
  const boardRef = useRef<ChessBoardRef>()
  const isSm = useMediaQuery('sm')

  const [moveList, setMoveList] = useState<string[] | undefined>(undefined)
  const [isSolved, setIsSolved] = useState(false)
  const [isWrong, setIsWrong] = useState(false)
  const [hide, setHide] = useState(true)
  const [showSolution, setShowSolution] = useState(false)
  const [turn, setTurn] = useState(undefined)
  // const [fen, setFen] = useState(puzzle?.fen)

  const solution = puzzle?.moves.split(' ')
  const isDisabled = !isWrong && !isSolved

  useEffect(() => {
    setTimeout(() => {
      const move = getSolutionMoves(0, solution)
      if (move) {
        makeMove(boardRef, move.from, move.to)
        setHide(false)
      }
    }, 1000)
  }, [solution])

  const handleShowSolution = () => {
    setShowSolution(s => (s = !s))
    // if (fen === puzzle?.fen) {
    //   setFen(undefined)
    // } else setFen(puzzle?.fen)
  }

  const handleNextPuzzle = () => {
    mutateSet()
  }

  const onMove = async (chess: OnMoveBoard) => {
    // TODO fix promotion fail puzzle bug
    if (isDisabled) {
      let isPuzzleDone = false
      const chessHistory = chess.history({ verbose: true })
      const historySAN = chessHistory.map(h => h.san)
      const historyUCI = chessHistory.map(h => {
        const promotion = h.promotion ? h.promotion : ''
        return `${h.from}${h.to}${promotion}`
      })

      setTurn(chess.turn())
      setMoveList(historySAN)

      historyUCI.forEach((move, i) => {
        if (solution && move !== solution[i]) {
          setIsWrong(true)
          isPuzzleDone = true
          updatePuzzle(setId, puzzleId, false)
        }
      })

      if (historyUCI.toString() === solution?.toString()) {
        setIsSolved(true)
        isPuzzleDone = true
        updatePuzzle(setId, puzzleId, true)
      }

      if (!isPuzzleDone) {
        const moveIdx = chessHistory.length
        const move = getSolutionMoves(moveIdx, solution)
        if (move && moveIdx % 2 === 0) {
          makeMove(boardRef, move.from, move.to)
        }
      }
    }
  }

  if (puzzle === undefined)
    return (
      <div className="flex flex-col items-center">
        <div className="mb-4 text-lg">-</div>
        {/* TODO fix height 100% for mobile (div has 0 height) */}
        <BoardPlaceholder size={isSm ? '500px' : '100%'} />
      </div>
    )

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-xl">
        <PuzzleStatus turn={turn} isSolved={isSolved} isWrong={isWrong} />
      </div>

      <Chessboard size={isSm ? '500px' : '100%'} fen={puzzle.fen} onMove={onMove} boardRef={boardRef} />

      {(isWrong || isSolved || hide) && (
        <div
          style={{ width: isSm ? '500px' : '100%', height: '500px' }}
          className="absolute z-10 mt-11 block opacity-0"
        ></div>
      )}

      <div className="mb-5 flex gap-2">
        <button className="btn btn-primary" onClick={() => router.push(puzzles())}>
          Go back
        </button>

        <button
          className={`btn ${isDisabled ? 'btn-disabled' : 'btn-primary'}`}
          disabled={isDisabled}
          onClick={handleShowSolution}
        >
          Show solution
        </button>

        <button
          className={`btn ${isDisabled ? 'btn-disabled' : 'btn-primary'}`}
          disabled={isDisabled}
          onClick={() => handleNextPuzzle()}
        >
          Next Puzzle
        </button>
      </div>

      <MoveHistory moveList={moveList} />
      {showSolution && <div className="mt-2">Solution: {solution?.toString()}</div>}
    </div>
  )
}
