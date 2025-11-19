import type { JSX } from 'react'

export type taskOrAward = {
  icon: JSX.Element
  title: string
  price: number
  id: number
  discount: number
  display: boolean
}
