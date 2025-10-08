import type { taskOrAward } from '@/types/taskOrAwards'
import {
  BedDouble,
  BicepsFlexed,
  Bike,
  BrushCleaning,
  CookingPot,
  Footprints,
  Smile,
} from 'lucide-react'

const className = 'stroke-white'

export const tasks: taskOrAward[] = [
  {
    icon: <BedDouble className={className} />,
    title: 'Лечь спать 10 часов',
    price: 50,
    id: 1,
  },
  {
    icon: <CookingPot className={className} />,
    title: 'Помыть посуду',
    price: 100,
    id: 2,
  },
  {
    icon: <Footprints className={className} />,
    title: 'Прогулка 15 минут по парку',
    price: 100,
    id: 3,
  },
  {
    icon: <Smile className={className} />,
    title: 'Чистка зубов 2 раза в день',
    price: 100,
    id: 4,
  },
  {
    icon: <BicepsFlexed className={className} />,
    title: 'Зарядка для спины',
    price: 100,
    id: 5,
  },
  {
    icon: <BrushCleaning className={className} />,
    title: 'Уборка 15 минут',
    price: 100,
    id: 6,
  },
  {
    icon: <Bike className={className} />,
    title: '10 минут на велотренажёре',
    price: 150,
    id: 7,
  },
]
