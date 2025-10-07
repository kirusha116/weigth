import {
  Beaker,
  BedDouble,
  BicepsFlexed,
  Bike,
  BrushCleaning,
  CookingPot,
  Footprints,
  Smile,
} from 'lucide-react'

const className = 'stroke-white'

export const tasks = [
  {
    icon: <BedDouble className={className} />,
    title: 'Лечь спать 10 часов',
    price: 50,
  },
  {
    icon: <CookingPot className={className} />,
    title: 'Помыть посуду',
    price: 100,
  },
  {
    icon: <Footprints className={className} />,
    title: 'Прогулка 15 минут по парку',
    price: 100,
  },
  {
    icon: <Smile className={className} />,
    title: 'Чистка зубов 2 раза в день',
    price: 100,
  },
  {
    icon: <BicepsFlexed className={className} />,
    title: 'Зарядка для спины',
    price: 100,
  },
  {
    icon: <BrushCleaning className={className} />,
    title: 'Уборка 15 минут',
    price: 100,
  },
  {
    icon: <Bike className={className} />,
    title: '10 минут на велотренажёре',
    price: 150,
  },
  {
    icon: <Beaker className={className} />,
    title: 'Прополоскать горло',
    price: 150,
  },
]
