import React from 'react'
import { useIsServer } from 'utils/hooks/useIsServer'
import { ChessboardProps } from './interface'

export default function Chessboard({ size = '500px', ...rest }: ChessboardProps) {
  const { NextChessground } = require('next-chessground')
  const isServer = useIsServer()

  if (!NextChessground || isServer) return null

  return (
    <div style={{ width: size, height: size + 28 }}>
      <NextChessground {...rest} />
    </div>
  )
}
