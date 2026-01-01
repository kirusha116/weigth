import { useAppDispatch, useGetTasks } from '@/hooks/storeHooks'
import { updateBalance } from '@/store/store'
import { useMediaQuery } from 'usehooks-ts'
import { lazy, memo } from 'react'
import successToast from '@/utils/successToast'
import TasksDay from './TasksDay'
import { makeDisplayFalse } from '@/utils/makeDisplayFalse'

const Item = lazy(() => import('../Item'))
function Tasks() {
  const tasks = useGetTasks()
  const sortedTasks = [...tasks].sort((a, b) => a.price - b.price)
  const isMobile = !useMediaQuery('(min-width: 768px)')
  const dispatch = useAppDispatch()
  return (
    <div className="flex flex-wrap gap-1">
      <TasksDay styled={!isMobile} />

      {sortedTasks.map(({ icon, title, price, id, display, daily }, index) => {
        if (!tasksDay.includes(id) && !completedTasks.includes(id) && display) {
          return (
            <Item
              style={{ width: isMobile ? '' : 'calc(50% - 2px)' }}
              key={index}
              icon={icon}
              title={title}
              price={'+' + Math.abs(price).toString()}
              onButtonClick={() => {
                successToast(`Молодец! +${Math.abs(price)}`)
                dispatch(updateBalance(price))
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
      })}
    </div>
  )
}

export default memo(Tasks)
