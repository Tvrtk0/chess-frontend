export interface ChessboardProps {
  size?: string
  boardRef?: React.MutableRefObject<ChessBoardRef | undefined>
  fen?: string
  orientation?: string
  lastMove?: () => Promise<void>
  onMove?: (chess: OnMoveBoard) => Promise<void>
}

export interface ChessBoardRef {
  board: {
    move: (from: string, to: string) => void
  }
}

export interface ChessHistory {
  color: string
  flags: string
  from: string
  piece: string
  san: string
  to: string
  promotion?: string
}

export interface OnMoveBoard {
  fen: () => string
  pgn: (options?: PgnOptions) => string
  /** Clear history? */
  clear: () => any
  undo: () => any
  turn: () => any
  board: () => any
  reset: () => any
  /** List of legal moves */
  moves: (options?: { verbose?: boolean }) => any
  history: (options?: { verbose?: boolean }) => ChessHistory[]
}

/** Example for html usage: .pgn({ max_width: 72, newline_char: "<br />" }) */
export interface PgnOptions {
  newline_char: string
  max_width: number
}
