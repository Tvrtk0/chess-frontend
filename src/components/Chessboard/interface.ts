export interface ChessboardProps {
  size?: string
  onMove?: (chess: OnMoveBoard) => Promise<void>
}

export interface OnMoveBoard {
  fen: () => string
}
