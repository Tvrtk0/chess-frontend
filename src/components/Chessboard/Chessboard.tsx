import React from 'react'
import { useIsServer } from 'utils/hooks/useIsServer'
import BoardPlaceholder from './BoardPlaceholder'
import { ChessboardProps } from './interface'

export default function Chessboard({ size = '500px', boardRef, ...rest }: ChessboardProps) {
  const { NextChessground } = require('next-chessground')
  const isServer = useIsServer()

  if (!NextChessground || isServer) return <BoardPlaceholder size={size} />

  return (
    <div style={{ width: size, height: `calc(${size} + 28px)` }}>
      <NextChessground {...rest} ref={boardRef} />
    </div>
  )
}
