import { tasks } from '@/constants/tasks'
import { Item } from './Item'
import type { Storage } from '@/utils/workWithStorage'

export default function Tasks({
  completedTasks,
  balance,
  onSave,
}: {
  completedTasks: number[]
  balance: number
  onSave: (newValuesObject: Partial<Storage>) => void
}) {
  return (
    <div className="mr-6">
      <h1 className="text-2xl mb-6">
        <b>Задания</b>
      </h1>
      <div className="flex flex-wrap ">
        {tasks.map(({ icon, title, price, id }, index) => {
          if (!completedTasks.includes(id)) {
            return (
              <Item
                style={{ width: 'calc(50% - 2px)' }}
                key={index}
                icon={icon}
                title={title}
                price={'+' + price.toString()}
                onSelect={() => {
                  onSave({
                    balance: balance + price,
                    completedTasks: [...completedTasks, id],
                  })
                }}
              />
            )
          }
        })}
      </div>
    </div>
  )
}
