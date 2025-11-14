import type { JSX } from 'react'

export type BlockMainContentProps = {
  variant: 'weight' | 'callories'
  icon: JSX.Element
  title1: string
  title2: string
  dialogTriggerText: string
  dialogHeader: string
  footerText: string
  titleNumber: number
  isButtonVisible: boolean
  defaultDialogValue: string
  progressValue: number
  progressText: string
  indicatorStyle: string
  onSave: (newValue: number) => void
}
