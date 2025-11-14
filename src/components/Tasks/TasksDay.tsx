import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { handleSave, initialState } from '@/store/store'
import { tasks } from '@/constants/tasks'
import { lazy, useEffect } from 'react'
import successToast from '@/utils/successToast'

const Item = lazy(() => import('../Item'))

export function TasksDay({ styled }: { styled?: boolean }) {
  const { completedTasks, balance, tasksDay } = useGetStorage()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initialState())
  }, [dispatch])

  return (
    <>
      {tasks
        .sort((a, b) => b.price * b.discount - a.price * a.discount)
        .map(({ icon, id, price, title, discount }, index) => {
          if (tasksDay.includes(id) && !completedTasks.includes(id)) {
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
