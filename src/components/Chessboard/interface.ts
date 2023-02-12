export interface ChessboardProps {
  size?: string
  boardRef?: React.MutableRefObject<undefined>
  fen?: string
  onMove?: (chess: OnMoveBoard) => Promise<void>
}

export interface OnMoveBoard {
  fen: () => string
  pgn: (options?: PgnOptions) => string
  moves: (options?: { verbose?: boolean }) => any
  history: (options?: { verbose?: boolean }) => any
}

/** Example for html usage: .pgn({ max_width: 72, newline_char: "<br />" }) */
export interface PgnOptions {
  newline_char: string
  max_width: number
}
