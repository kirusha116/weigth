import { awards } from '@/constants/awards'
import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { handleSave, initialState } from '@/store/store'
import successToast from '@/utils/successToast'
import warningToast from '@/utils/warningToast'
import { lazy, useEffect } from 'react'

const Item = lazy(() => import('../Item'))

export function AwardsDay({ styled }: { styled?: boolean }) {
  const { completedAwards, balance, awardsDay } = useGetStorage()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initialState())
  }, [dispatch])

  return (
    <>
      {awards
        .sort((a, b) => b.price * b.discount - a.price * a.discount)
        .map(({ icon, id, price, title, discount }, index) => {
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
                    successToast(
                      `Покупочка оформлена! -${discount * Math.abs(price)}`,
                    )
                    dispatch(
                      handleSave({
                        balance: balance - discount * Math.abs(price),
                        completedAwards: [...completedAwards, id],
                      }),
                    )
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
