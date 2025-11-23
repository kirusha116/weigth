import {
  useAppDispatch,
  useGetStorage,
  useGetTasks,
} from '@/hooks/storageHooks'
import { handleSave } from '@/store/store'
import { lazy } from 'react'
import successToast from '@/utils/successToast'
import { makeDisplayFalse } from '@/utils/makeDisplayFalse'

const Item = lazy(() => import('../Item'))

export function TasksDay({ styled }: { styled?: boolean }) {
  const { completedTasks, balance, tasksDay } = useGetStorage()
  const tasks = useGetTasks()
  const sortedTasks = [...tasks].sort(
    (a, b) => a.price * a.discount - b.price * b.discount,
  )
  const dispatch = useAppDispatch()

  return (
    <>
      {sortedTasks
        .sort((a, b) => a.price * a.discount - b.price * b.discount)
        .map(({ icon, id, price, title, discount, display, daily }, index) => {
          if (
            tasksDay.includes(id) &&
            !completedTasks.includes(id) &&
            display
          ) {
            return (
              <Item
                style={{ width: styled ? 'calc(50% - 2px)' : '' }}
                key={index}
                icon={icon}
                title={title}
                oldPrice={'+' + Math.abs(price).toString()}
                discount={'+' + Math.round((discount - 1) * 100) + '%'}
                price={'+' + Math.abs(discount * price).toString()}
                onButtonClick={() => {
                  successToast(`Молодец! +${Math.abs(discount * price)}`)
                  dispatch(
                    handleSave({
                      balance: balance + discount * price,
                      completedTasks: [...completedTasks, id],
                    }),
                  )
                  if (!daily) makeDisplayFalse('tasks', id)
                }}
              />
            )
          }
        })}
    </>
  )
}
