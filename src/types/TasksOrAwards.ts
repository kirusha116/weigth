import type { IconName } from 'lucide-react/dynamic'

export type TasksOrAwards = {
  icon: IconName
  title: string
  price: number
  id: number
  discount: number
  display: boolean
  daily: boolean
}
