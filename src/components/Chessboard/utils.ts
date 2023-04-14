import { MutableRefObject } from 'react'
import { ChessBoardRef } from './interface'

/** Move a piece from one square to another */
export const makeMove = (
  boardRef: MutableRefObject<ChessBoardRef | undefined>,
  fromSquare: string,
  toSquare: string
) => {
  return setTimeout(() => {
    if (!boardRef.current) return null
    boardRef.current.board.move(fromSquare, toSquare)
  }, 500)
}
