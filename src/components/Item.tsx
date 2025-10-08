import { CircleCheck } from 'lucide-react'
import { Button } from './ui/button'
import type { JSX } from 'react'

export function Item({
  icon,
  title,
  price,
  onSelect,
  style,
}: {
  icon: JSX.Element
  title: string
  price: string
  onSelect: () => void
  style?: React.CSSProperties | undefined
}) {
  return (
    <div
      className={
        'flex items-center rounded-lg bg-white border shadow-xs px-3 py-2'
      }
      style={style}
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
