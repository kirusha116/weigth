import { awards } from '@/constants/awards'
import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { handleSave } from '@/store/store'
import { useMediaQuery } from 'usehooks-ts'
import { lazy } from 'react'
import successToast from '@/utils/successToast'
import warningToast from '@/utils/warningToast'

const Item = lazy(() => import('../Item'))

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

export default function Awards() {
  const { completedAwards, balance, awardsDay } = useGetStorage()
  const dispatch = useAppDispatch()
  const isMobile = !useMediaQuery('(min-width: 768px)')
  return (
    <>
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
                    successToast(`Покупочка оформлена! -${Math.abs(price)}`)
                    dispatch(
                      handleSave({
                        balance: balance - Math.abs(price),
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
      </div>
    </>
  )
}
