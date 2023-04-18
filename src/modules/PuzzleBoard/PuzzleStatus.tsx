type Props = { isSolved?: boolean; isWrong?: boolean; turn?: string }

export const PuzzleStatus = ({ isSolved, isWrong, turn }: Props) => {
  let status = '-'
  if (turn === 'w') status = 'White to move'
  if (turn === 'b') status = 'Black to move'
  if (isSolved) status = 'Puzzle Solved!'
  if (isWrong) status = 'Puzzle Failed'

  return <p className={`text-xl ${isSolved && 'text-green-400'} ${isWrong && 'text-red-400'}`}>{status}</p>
}
