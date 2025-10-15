import { awards } from '@/constants/awards'
import { Item } from './Item'
import { toast } from 'sonner'
import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { handleSave } from '@/store/store'
import { useMediaQuery } from 'usehooks-ts'

export function AwardsDay({ styled }: { styled?: boolean }) {
  const { completedAwards, balance, awardsDay } = useGetStorage()
  const dispatch = useAppDispatch()

  return (
    <>
      {awards.map(({ icon, id, price, title, discount }, index) => {
        if (awardsDay.includes(id) && !completedAwards.includes(id)) {
          return (
            <Item
              style={{ width: styled ? 'calc(50% - 2px)' : '' }}
              key={index}
              icon={icon}
              title={title}
              oldPrice={'-' + Math.abs(price).toString()}
              discount={'-' + Math.round((1 - discount) * 100) + '%'}
              price={'-' + Math.abs(discount * price).toString()}
              onButtonClick={() => {
                if (balance >= discount * Math.abs(price)) {
                  toast.success(
                    `Покупочка оформлена! -${discount * Math.abs(price)}`,
                    {
                      classNames: {
                        toast:
                          'flex justify-center !w-fit relative left-[50%] translate-x-[-50%] ',
                        title: 'text-base ml-2 text-nowrap',
                      },
                    },
                  )
                  dispatch(
                    handleSave({
                      balance: balance - discount * Math.abs(price),
                      completedAwards: [...completedAwards, id],
                    }),
                  )
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
    </>
  )
}

export default function Awards() {
  const { completedAwards, balance, awardsDay } = useGetStorage()
  const dispatch = useAppDispatch()
  const isMobile = !useMediaQuery('(min-width: 768px)')
  return (
    <>
      <div>
        <h1 className="text-2xl mb-6">
          <b>Награды</b>
        </h1>
        <div className="flex flex-wrap gap-1">
          <AwardsDay styled={!isMobile} />
          {awards.map(({ icon, title, price, id }, index) => {
            if (!awardsDay.includes(id)! && !completedAwards.includes(id)) {
              return (
                <Item
                  style={{ width: isMobile ? '' : 'calc(50% - 2px)' }}
                  key={index}
                  icon={icon}
                  title={title}
                  price={'-' + Math.abs(price).toString()}
                  onButtonClick={() => {
                    if (balance >= Math.abs(price)) {
                      toast.success(
                        `Покупочка оформлена! -${Math.abs(price)}`,
                        {
                          classNames: {
                            toast:
                              'flex justify-center !w-fit relative left-[50%] translate-x-[-50%] ',
                            title: 'text-base ml-2 text-nowrap',
                          },
                        },
                      )
                      dispatch(
                        handleSave({
                          balance: balance - Math.abs(price),
                          completedAwards: [...completedAwards, id],
                        }),
                      )
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
