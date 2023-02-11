export interface ChessboardProps {
  size?: string
  boardRef?: React.MutableRefObject<undefined>
  onMove?: (chess: OnMoveBoard) => Promise<void>
}

export interface OnMoveBoard {
  fen: () => string
}
