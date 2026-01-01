import { useAppDispatch, useGetTasks } from '@/hooks/storeHooks'
import { updateBalance } from '@/store/store'
import { lazy, memo } from 'react'
import successToast from '@/utils/successToast'
import { makeDisplayFalse } from '@/utils/makeDisplayFalse'

const Item = lazy(() => import('../Item'))

function TasksDay({ styled }: { styled?: boolean }) {
  const tasks = useGetTasks()
  const sortedTasks = [...tasks].sort(
    (a, b) => a.price * a.discount - b.price * b.discount,
  )
  const dispatch = useAppDispatch()

  return (
    <>
      {sortedTasks.map(
        ({ icon, id, price, title, discount, display, daily }, index) => {
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
                  dispatch(updateBalance(discount * price))
                  dispatch(
                    handleSave({
                      completedTasks: [...completedTasks, id],
                    }),
                  )
                  if (!daily) makeDisplayFalse('tasks', id)
                }}
              />
            )
          }
        },
      )}
    </>
  )
}
export default memo(TasksDay)
