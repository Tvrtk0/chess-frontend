import RatingColor from 'components/RatingColor/RatingColor'
import { routes } from 'config'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { useSWRConfig } from 'swr'

export default function CreateSet() {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { data: session } = useSession()
  const email = session?.user?.email ?? ''

  const minRating = 700
  const maxRating = 2900
  const sizeMap = [10, 100, 200, 500, 1000]

  const [rating, setRating] = useState(minRating)
  const [size, setSize] = useState(sizeMap[0])

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(+e.target.value)
  }

  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSize(sizeMap[+e.target.value])
  }

  const handleSubmit = () => {
    if (rating >= minRating && rating <= maxRating) {
      if (sizeMap.includes(size)) {
        fetch(routes.crateSetAPI(), {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ rating: rating, size: size, email: email }),
        }).then(() => mutate(routes.puzzleSetsAPI(email)))
      }
    }
    router.push(routes.puzzles())
  }

  return (
    <div className="container mx-auto">
      <div className="mt-14 flex flex-col items-center gap-3 px-3">
        <h2 className="mb-7">Create Puzzle Set</h2>

        <div className="mb-3 flex w-full max-w-xs flex-col items-center justify-between">
          <div className="flex w-full items-center justify-between px-2">
            <div className="mr-3">Rating:</div>
            <div className="flex items-center gap-2">
              <RatingColor rating={rating} size="sm" /> {rating}
            </div>
          </div>
          <input
            id="rating"
            type="range"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleRatingChange(e)}
            min={minRating}
            max={maxRating}
            step={100}
            value={rating}
            className="w-full cursor-pointer"
          />
        </div>

        <div className=" flex w-full max-w-xs flex-col items-center justify-between">
          <div className="flex w-full items-center justify-between px-2">
            <div className="mr-3">Size:</div>
            <div className="flex items-center gap-2">{size}</div>
          </div>
          <input
            id="size"
            type="range"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSizeChange(e)}
            defaultValue={0}
            min={0}
            max={sizeMap.length - 1}
            step={1}
            className="w-full cursor-pointer"
          />
        </div>

        <button className="btn btn-primary mt-7 w-full max-w-xs" onClick={() => handleSubmit()}>
          Create
        </button>
      </div>
    </div>
  )
}
