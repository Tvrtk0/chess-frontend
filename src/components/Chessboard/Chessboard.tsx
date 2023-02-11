import React from 'react'
import { useIsServer } from 'utils/hooks/useIsServer'
import { ChessboardProps } from './interface'

export default function Chessboard({ size = '500px', boardRef, ...rest }: ChessboardProps) {
  const { NextChessground } = require('next-chessground')
  const isServer = useIsServer()

  if (!NextChessground || isServer)
    return <div className="mb-[28px] bg-stone-800 md:rounded-md" style={{ minHeight: size, width: size }}></div>

  return (
    <div style={{ width: size, height: `calc(${size} + 28px)` }}>
      <NextChessground {...rest} ref={boardRef} />
    </div>
  )
}
