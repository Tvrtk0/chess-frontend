export const MoveHistory = ({ moveList }: { moveList?: string[] }) => {
  if (!moveList?.length) return null
  return (
    <div className="flex">
      {moveList.map((move, i) => {
        const index = i % 2 === 0 ? i / 2 + 1 + '.' : ''
        return (
          <div key={`${i}-${move}`}>
            {index}
            {move}
            &nbsp;
          </div>
        )
      })}
    </div>
  )
}
