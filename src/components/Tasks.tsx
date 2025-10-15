import { tasks } from '@/constants/tasks'
import { Item } from './Item'
import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { handleSave } from '@/store/store'
import { useMediaQuery } from 'usehooks-ts'

export function TasksDay({ styled }: { styled?: boolean }) {
  const { completedTasks, balance, tasksDay } = useGetStorage()
  const dispatch = useAppDispatch()
  return (
    <>
      {tasks.map(({ icon, id, price, title, discount }, index) => {
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

export default function Tasks() {
  const { completedTasks, balance, tasksDay } = useGetStorage()
  const dispatch = useAppDispatch()
  const isMobile = !useMediaQuery('(min-width: 768px)')

  return (
    <div>
      <h1 className="text-2xl mb-6">
        <b>Задания</b>
      </h1>

      <div className="flex flex-wrap gap-1">
        <TasksDay styled={!isMobile} />

        {tasks.map(({ icon, title, price, id }, index) => {
          if (!tasksDay.includes(id) && !completedTasks.includes(id)) {
            return (
              <Item
                style={{ width: isMobile ? '' : 'calc(50% - 2px)' }}
                key={index}
                icon={icon}
                title={title}
                price={'+' + Math.abs(price).toString()}
                onButtonClick={() => {
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
    </div>
  )
}
