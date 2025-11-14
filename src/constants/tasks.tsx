import type { taskOrAward } from '@/types/taskOrAwards'
import {
  BedDouble,
  BicepsFlexed,
  Bike,
  BrushCleaning,
  CookingPot,
  Footprints,
  HeartHandshake,
  Smile,
} from 'lucide-react'

const className = 'stroke-white'

export const tasks: taskOrAward[] = [
  {
    icon: <BedDouble className={className} />,
    title: 'Лечь спать до 10 часов',
    price: 50,
    id: 1,
    discount: 2,
  },
  {
    icon: <CookingPot className={className} />,
    title: 'Помыть посуду',
    price: 100,
    id: 2,
    discount: 1.5,
  },
  {
    icon: <Footprints className={className} />,
    title: 'Прогулка 20 минут по парку',
    price: 100,
    id: 3,
    discount: 2.5,
  },
  {
    icon: <Smile className={className} />,
    title: 'Чистка зубов 2 раза в день',
    price: 100,
    id: 4,
    discount: 1.2,
  },
  {
    icon: <BicepsFlexed className={className} />,
    title: 'Зарядка для спины',
    price: 100,
    id: 5,
    discount: 1.2,
  },
  {
    icon: <BrushCleaning className={className} />,
    title: 'Уборка 15 минут',
    price: 100,
    id: 6,
    discount: 1.5,
  },
  {
    icon: <Bike className={className} />,
    title: '10 минут на велотренажёре',
    price: 150,
    id: 7,
    discount: 2,
  },
  {
    icon: <HeartHandshake className={className} />,
    title: 'Массаж ручек по 10 мин',
    price: 250,
    id: 8,
    discount: 1.2,
  },
  {
    icon: <HeartHandshake className={className} />,
    title: 'Распечатать фотографии для книги приключений',
    price: 1000,
    id: 9,
    discount: 1.1,
  },
  {
    icon: <HeartHandshake className={className} />,
    title: 'Выполнить задание из книги приключений',
    price: 1500,
    id: 10,
    discount: 1.25,
  },
]
