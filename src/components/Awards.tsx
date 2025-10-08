import { awards } from '@/constants/awards'
import { Item } from './Item'
import type { Storage } from '@/utils/workWithStorage'
import { toast } from 'sonner'

export default function Awards({
  completedAwards,
  balance,
  onSave,
}: {
  completedAwards: number[]
  balance: number
  onSave: (newValuesObject: Partial<Storage>) => void
}) {
  return (
    <>
      <div className="mr-6">
        <h1 className="text-2xl mb-6">
          <b>Награды</b>
        </h1>
        <div className="flex flex-wrap ">
          {awards.map(({ icon, title, price, id }, index) => {
            if (!completedAwards.includes(id)) {
              return (
                <Item
                  key={index}
                  icon={icon}
                  title={title}
                  price={'-' + price.toString()}
                  index={index}
                  onSelect={() => {
                    if (balance >= price) {
                      toast.success(`Покупочка оформлена! -${price}`, {
                        classNames: {
                          toast:
                            'flex justify-center !w-fit relative left-[50%] translate-x-[-50%] ',
                          title: 'text-base ml-2 text-nowrap',
                        },
                      })
                      onSave({
                        balance: balance - price,
                        completedAwards: [...completedAwards, id],
                      })
                    } else {
                      toast.warning(`Упс! Не хватает звёздочек!`, {
                        classNames: {
                          toast:
                            'flex justify-center !w-fit relative left-[50%] translate-x-[-50%] ',
                          title: 'text-base ml-2 text-nowrap',
                        },
                      })
                    }
                  }}
                />
              )
            }
          })}
        </div>
      </div>
    </>
  )
}
