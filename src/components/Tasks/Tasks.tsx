import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { handleSave } from '@/store/store'
import { useMediaQuery } from 'usehooks-ts'
import { tasks } from '@/constants/tasks'
import { lazy } from 'react'
import successToast from '@/utils/successToast'
import { TasksDay } from './TasksDay'

const Item = lazy(() => import('../Item'))

export default function Tasks() {
  const { completedTasks, balance, tasksDay } = useGetStorage()
  const dispatch = useAppDispatch()
  const isMobile = !useMediaQuery('(min-width: 768px)')

  return (
    <div className="flex flex-wrap gap-1">
      <TasksDay styled={!isMobile} />

      {tasks
        .sort((a, b) => b.price - a.price)
        .map(({ icon, title, price, id }, index) => {
          if (!tasksDay.includes(id) && !completedTasks.includes(id)) {
            return (
              <Item
                style={{ width: isMobile ? '' : 'calc(50% - 2px)' }}
                key={index}
                icon={icon}
                title={title}
                price={'+' + Math.abs(price).toString()}
                onButtonClick={() => {
                  successToast(`Молодец! +${Math.abs(price)}`)
                  dispatch(
                    handleSave({
                      balance: balance + price,
                      completedTasks: [...completedTasks, id],
                    }),
                  )
                }}
              />
            )
          }
        })}
    </div>
  )
}
