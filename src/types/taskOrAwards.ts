import type { IconName } from 'lucide-react/dynamic'

export type TaskOrAward = {
  icon: IconName
  title: string
  price: number
  id: number
  discount: number
  display: boolean
}
