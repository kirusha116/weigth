import { Badge, CircleCheck, Star } from 'lucide-react'
import { Button } from './ui/button'
import { useEffect, useRef, useState, type JSX } from 'react'

export function Item({
  icon,
  title,
  price,
  onButtonClick,
  style,
  oldPrice,
  discount,
}: {
  icon: JSX.Element
  title: string
  price: string
  onButtonClick: () => void
  style?: React.CSSProperties
  oldPrice?: string
  discount?: string
}) {
  const parentBlock = useRef<HTMLDivElement | null>(null)
  const [strokeWidth, setStrokeWidth] = useState<number | null>(null)

  useEffect(() => {
    if (parentBlock) setStrokeWidth(parentBlock.current?.offsetWidth as number)
  }, [parentBlock])

  return (
    <div
      className={
        'flex items-center rounded-lg bg-white border shadow-xs px-3 py-2 relative w-full'
      }
      style={style}
    >
      {discount && (
        <div className="absolute left-0 top-0 -translate-1/3 size-fit z-10">
          <Badge className="size-14 stroke-1 stroke-white fill-pink-400 scale-y-80" />
          <span className="absolute left-1/2 top-1/2 -translate-1/2 text-white text-xs tracking-tighter">
            <b>{discount}</b>
          </span>
        </div>
      )}
      <div className="h-9 rounded-md aspect-square bg-rose-300 mr-4 flex justify-center items-center">
        {icon}
      </div>
      <div>
        <p>
          <b>{title}</b>
        </p>
        <div className="flex flex-row items-start h-fit">
          {oldPrice && (
            <>
              <div
                className="w-fit h-fit flex flex-row items-center mr-3"
                ref={parentBlock}
              >
                <div
                  className="absolute h-0 border border-black"
                  style={{
                    width: strokeWidth ? strokeWidth + 'px' : 'auto',
                  }}
                ></div>
                <p className="text-gray-500 text-[12.8px]">{oldPrice}</p>
                <Star className="ml-1 size-4 stroke-gray-400 fill-gray-400" />
              </div>
            </>
          )}
          <div className="w-fit h-fit flex flex-row items-center">
            <p>{price}</p>
            <Star className="ml-1 size-5 stroke-rose-300 fill-rose-300" />
          </div>
        </div>
      </div>
      <div className="grow"></div>
      <Button
        size="icon"
        variant="rose"
        className="!size-9 ml-4"
        onClick={() => onButtonClick()}
      >
        <CircleCheck className="stroke-white size-6" />
      </Button>
    </div>
  )
}
