import { type JSX } from 'react'

export type AsyncStateOfComp =
  | (({
      isOpen,
      onOpenChange,
    }: {
      isOpen: boolean
      onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
    }) => JSX.Element)
  | null

export type WarningStateOfComp =
  | (({
      variant,
      isOpen,
      onOpenChange,
    }: {
      variant: 'exit' | 'reset'
      isOpen: boolean
      onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
    }) => JSX.Element)
  | null
