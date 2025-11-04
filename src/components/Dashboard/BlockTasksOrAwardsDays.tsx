import { BicepsFlexed, Sparkles } from 'lucide-react'
import type { JSX, ReactElement } from 'react'
import { TasksDay } from '../../pages/Tasks'
import { AwardsDay } from '../../pages/Awards'

type Variant = 'tasks' | 'awards'
const iconClassName = 'stroke-rose-300 size-14 absolute'
const variantProps: {
  [key in Variant]: {
    icon: JSX.Element
    arr: ReactElement
    title: string
    description: string
    keyOfStorage: keyof Storage
    sign: string
  }
} = {
  tasks: {
    icon: <BicepsFlexed className={iconClassName} />,
    arr: <TasksDay />,
    title: 'Задания дня!',
    description: 'Успей выполнить пока награда так высока!',
    keyOfStorage: 'completedTasks',
    sign: '+',
  },
  awards: {
    icon: <Sparkles className={iconClassName} />,
    arr: <AwardsDay />,
    title: 'Скидки дня!',
    description: 'Лишь бы звёздочек хватило(',
    keyOfStorage: 'completedAwards',
    sign: '-',
  },
}

export function BlockTasksOrAwardsDays({ variant }: { variant: Variant }) {
  return (
    <>
      {variantProps[variant].icon}
      <p className="text-xl text-center leading-14 mb-2">
        <b>{variantProps[variant].title}</b>
      </p>
      <p className="text-base text-center mb-3">
        {variantProps[variant].description}
      </p>
      <div className="flex flex-col gap-1">{variantProps[variant].arr}</div>
    </>
  )
}
