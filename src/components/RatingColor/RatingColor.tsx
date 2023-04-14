export const getRatingColor = (rating: number) => {
  if (rating < 900) return { primary: 'bg-red-500', secondary: 'bg-red-200' }
  if (rating >= 900 && rating < 1300) return { primary: 'bg-orange-500', secondary: 'bg-orange-200' }
  if (rating >= 1300 && rating < 1600) return { primary: 'bg-yellow-500', secondary: 'bg-yellow-200' }
  if (rating >= 1600 && rating < 1800) return { primary: 'bg-lime-500', secondary: 'bg-lime-200' }
  if (rating >= 1800 && rating < 2000) return { primary: 'bg-emerald-500', secondary: 'bg-emerald-200' }
  if (rating >= 2000 && rating < 2200) return { primary: 'bg-cyan-500', secondary: 'bg-cyan-200' }
  if (rating >= 2200 && rating < 2500) return { primary: 'bg-indigo-500', secondary: 'bg-indigo-200' }
  return { primary: 'bg-purple-500', secondary: 'bg-purple-200' }
}

type Size = 'sm' | 'md' | 'lg'
export default function RatingColor({ rating, size }: { rating: number; size: Size }) {
  const sizeVariants = {
    lg: 'h-5 w-5',
    md: 'h-4 w-4',
    sm: 'h-3 w-3',
  }

  const { primary, secondary } = getRatingColor(rating)
  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex">
        <div
          className={`${sizeVariants[size]} rounded-tl-md border-l-2 border-t-2 border-stone-500 ${secondary}`}
        ></div>
        <div className={`${sizeVariants[size]} rounded-tr-md border-r-2 border-t-2 border-stone-500 ${primary}`}></div>
      </div>
      <div className="flex">
        <div className={`${sizeVariants[size]} rounded-bl-md border-l-2 border-b-2 border-stone-500 ${primary}`}></div>
        <div
          className={`${sizeVariants[size]} rounded-br-md border-r-2 border-b-2 border-stone-500 ${secondary}`}
        ></div>
      </div>
    </div>
  )
}
