import { awards } from '@/constants/awards'
import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { handleSave } from '@/store/store'
import { useMediaQuery } from 'usehooks-ts'
import { lazy } from 'react'
import successToast from '@/utils/successToast'
import warningToast from '@/utils/warningToast'
import { AwardsDay } from './AwardsDay'

const Item = lazy(() => import('../Item'))

export default function Awards() {
  const { completedAwards, balance, awardsDay } = useGetStorage()
  const isMobile = !useMediaQuery('(min-width: 768px)')
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="flex flex-wrap gap-1">
        <AwardsDay styled={!isMobile} />
        {awards
          .sort((a, b) => b.price - a.price)
          .map(({ icon, title, price, id }, index) => {
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
