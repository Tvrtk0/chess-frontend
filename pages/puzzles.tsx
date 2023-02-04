import Chessboard from 'components/Chessboard'
import React from 'react'

export default function Puzzles() {
  return (
    <div className="container m-auto">
      <div className="mt-10 flex justify-center">
        <Chessboard size="600px" />
      </div>
    </div>
  )
}
