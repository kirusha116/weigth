import type { taskOrAward } from '@/types/taskOrAwards'
import { BriefcaseBusiness, Hamburger, PlugZap, Utensils } from 'lucide-react'

const className = 'stroke-white'

export const awards: taskOrAward[] = [
  {
    icon: <Hamburger className={className} />,
    title: 'Поход в фастфуд',
    price: 1500,
    id: 1,
  },
  {
    icon: <Utensils className={className} />,
    title: 'Поход в ресторан',
    price: 4000,
    id: 2,
  },
  {
    icon: <PlugZap className={className} />,
    title: 'Аналог дайсон',
    price: 200000,
    id: 3,
  },
  {
    icon: <BriefcaseBusiness className={className} />,
    title: 'Уволиться с работы',
    price: 1000000,
    id: 4,
  },
]
