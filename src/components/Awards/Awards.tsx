import { useAppDispatch, useGetBalance } from '@/hooks/storeHooks'
import { updateBalance } from '@/store/store'
import { useMediaQuery } from 'usehooks-ts'
import { lazy, memo, useEffect, useState } from 'react'
import successToast from '@/utils/successToast'
import warningToast from '@/utils/warningToast'
import { AwardsDay } from './AwardsDay'
import { makeDisplayFalse } from '@/utils/makeDisplayFalse'
import type { TasksOrAwards } from '@/types/TasksOrAwards'

const Item = lazy(() => import('../Item'))

function Awards() {
  const balance = useGetBalance()
  const [awards, setAwards] = useState<TasksOrAwards[] | null>(null)
  const sortedAwards = [...awards].sort((a, b) => b.price - a.price)
  const isMobile = !useMediaQuery('(min-width: 768px)')
  const dispatch = useAppDispatch()

  useEffect(() => {
    const get = async () => {
      const getList = (await import('@/utils/getList')).getList
      const awards = (await getList('awards')) as TasksOrAwards[]
      setAwards(awards)
    }
    get()
  }, [])
  return (
    <>
      <div className="flex flex-wrap gap-1">
        <AwardsDay styled={!isMobile} />
        {sortedAwards.map(
          ({ icon, title, price, id, display, daily }, index) => {
            if (
              !awardsDay.includes(id)! &&
              !completedAwards.includes(id) &&
              display
            ) {
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
                      dispatch(updateBalance(-Math.abs(price)))
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
          },
        )}
      </div>
    </>
  )
}

export default memo(Awards)
