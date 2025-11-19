import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { handleSave } from '@/store/store'
import { tasks } from '@/constants/tasks'
import { lazy } from 'react'
import successToast from '@/utils/successToast'

const Item = lazy(() => import('../Item'))

export function TasksDay({ styled }: { styled?: boolean }) {
  const { completedTasks, balance, tasksDay } = useGetStorage()
  const dispatch = useAppDispatch()

  return (
    <>
      {tasks
        .sort((a, b) => a.price * a.discount - b.price * b.discount)
        .map(({ icon, id, price, title, discount, display }, index) => {
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
                }}
              />
            )
          }
        })}
    </>
  )
}
