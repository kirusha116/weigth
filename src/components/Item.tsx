import { CircleCheck } from 'lucide-react'
import { Button } from './ui/button'
import type { JSX } from 'react'

export function Item({
  icon,
  title,
  price,
  index,
  onSelect,
}: {
  icon: JSX.Element
  title: string
  price: string
  index: number
  onSelect: () => void
}) {
  return (
    <div
      className={`flex items-center rounded-lg bg-white border shadow-xs px-3 py-2 ${
        index % 2 && 'ml-1'
      }`}
      style={{ width: 'calc(50% - 2px)' }}
    >
      <div className="h-9 rounded-md aspect-square bg-rose-300 mr-4 flex justify-center items-center">
        {icon}
      </div>
      <div>
        <p>
          <b>{title}</b>
        </p>
        <p>{`${price} баллов`}</p>
      </div>
      <div className="grow"></div>
      <Button
        size="icon"
        variant="rose"
        className="!size-9"
        onClick={() => onSelect()}
      >
        <CircleCheck className="stroke-white size-6" />
      </Button>
    </div>
  )
}
