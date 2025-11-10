import { type JSX } from 'react'

export type Dialog =
  | (({
      isOpen,
      onOpenChange,
    }: {
      isOpen: boolean
      onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
    }) => JSX.Element)
  | null
