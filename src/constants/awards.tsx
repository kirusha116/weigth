import { BriefcaseBusiness, Hamburger, PlugZap, Utensils } from 'lucide-react'

const className = 'stroke-white'

export const awards = [
  {
    icon: <Hamburger className={className} />,
    title: 'Поход в фастфуде',
    price: 1500,
  },
  {
    icon: <Utensils className={className} />,
    title: 'Поход в ресторане',
    price: 4000,
  },
  {
    icon: <PlugZap className={className} />,
    title: 'Аналог дайсон',
    price: 200000,
  },
  {
    icon: <BriefcaseBusiness className={className} />,
    title: 'Уволиться с работы',
    price: 1000000,
  },
]
