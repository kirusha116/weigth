import {
  useAppDispatch,
  useGetStorage,
  useGetTasks,
} from '@/hooks/storageHooks'
import { handleSave } from '@/store/store'
import { useMediaQuery } from 'usehooks-ts'
import { lazy } from 'react'
import successToast from '@/utils/successToast'
import { TasksDay } from './TasksDay'

const Item = lazy(() => import('../Item'))

export default function Tasks() {
  const { completedTasks, balance, tasksDay } = useGetStorage()
  const tasks = useGetTasks()
  const sortedTasks = [...tasks].sort((a, b) => a.price - b.price)
  const isMobile = !useMediaQuery('(min-width: 768px)')
  const dispatch = useAppDispatch()
  return (
    <div className="flex flex-wrap gap-1">
      <TasksDay styled={!isMobile} />

      {sortedTasks
        .map(({ icon, title, price, id, display }, index) => {
          if (
            !tasksDay.includes(id) &&
            !completedTasks.includes(id) &&
            display
          ) {
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
