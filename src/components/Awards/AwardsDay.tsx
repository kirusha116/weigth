import {
  useAppDispatch,
  useGetAwards,
  useGetBalance,
} from '@/hooks/storeHooks'
import { updateBalance } from '@/store/store'
import { makeDisplayFalse } from '@/utils/makeDisplayFalse'
import successToast from '@/utils/successToast'
import warningToast from '@/utils/warningToast'
import { lazy } from 'react'

const Item = lazy(() => import('../Item'))

export function AwardsDay({ styled }: { styled?: boolean }) {

  const balance = useGetBalance()

  const awards = useGetAwards()
  const sortedAwards = [...awards].sort(
    (a, b) => b.price * b.discount - a.price * a.discount,
  )
  const dispatch = useAppDispatch()

  return (
    <>
      {sortedAwards
        .sort((a, b) => b.price * b.discount - a.price * a.discount)
        .map(({ icon, id, price, title, discount, display, daily }, index) => {
          if (
            awardsDay.includes(id) &&
            !completedAwards.includes(id) &&
            display
          ) {
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
                    successToast(
                      `Покупочка оформлена! -${discount * Math.abs(price)}`,
                    )
                    dispatch(updateBalance(-discount * Math.abs(price)))
                    dispatch(
                      handleSave({
                        completedAwards: [...completedAwards, id],
                      }),
                    )
                    if (!daily) makeDisplayFalse('awards', id)
                  } else {
                    warningToast('Упс! Не хватает звёздочек!')
                  }
                }}
              />
            )
          }
        })}
    </>
  )
}
