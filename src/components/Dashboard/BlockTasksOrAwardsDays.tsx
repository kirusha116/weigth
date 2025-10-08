import type { taskOrAward } from '@/types/taskOrAwards'
import { BicepsFlexed, Sparkles } from 'lucide-react'
import type { JSX } from 'react'
import { Item } from '../Item'
import type { Storage } from '@/utils/workWithStorage'

type Variant = 'tasks' | 'awards'
const iconClassName = 'stroke-rose-300 size-14 absolute'
const variantProps: {
  [key in Variant]: {
    icon: JSX.Element
    title: string
    description: string
    keyOfStorage: keyof Storage
  }
} = {
  tasks: {
    icon: <BicepsFlexed className={iconClassName} />,
    title: 'Задания дня!',
    description: 'Успей выполнить пока награда так высока!',
    keyOfStorage: 'completedTasks',
  },
  awards: {
    icon: <Sparkles className={iconClassName} />,
    title: 'Скидки дня!',
    description: 'Лишь бы звёздочек хватило(',
    keyOfStorage: 'completedAwards',
  },
}

export function BlockTasksOrAwardsDays({
  variant,
  arr,
  ids,
  balance,
  completed,
  onSave,
}: {
  variant: Variant
  arr: taskOrAward[]
  ids: number[]
  balance: number
  completed: number[]
  onSave: (newValuesObject: Partial<Storage>) => void
}) {
  return (
    <>
      {variantProps[variant].icon}
      <p className="text-xl text-center leading-14 mb-2">
        <b>{variantProps[variant].title}</b>
      </p>
      <p className="text-base text-center mb-3">
        {variantProps[variant].description}
      </p>
      {arr.map(({ icon, id, price, title }, index) => {
        if (ids.includes(id) && !completed.includes(id)) {
          return (
            <Item
              key={index}
              icon={icon}
              title={title}
              price={'+' + (2 * price).toString()}
              onSelect={() => {
                onSave({
                  balance: balance + 2 * price,
                  [variantProps[variant].keyOfStorage]: [...completed, id],
                })
              }}
            />
          )
        }
      })}
    </>
  )
}
