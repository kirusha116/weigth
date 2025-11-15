import { type JSX } from 'react'

export type WarningDialog =
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
