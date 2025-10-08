import BlockDialog from './BlockDialog'
import { Progress } from '../ui/progress'
import type { ReactElement } from 'react'

export function Block({
  icon,
  title1,
  titleNumber,
  title2,
  isButtonVisible,
  blockDialog,
  defaultDialogValue,
  progressValue,
  progressText,
  footerText,
  onSave,
}: {
  icon: ReactElement
  title1: string
  titleNumber: number
  title2: string
  isButtonVisible: boolean
  blockDialog: {
    dialogTriggerText: string
    dialogHeader: string
  }
  defaultDialogValue: string
  progressValue: number
  progressText: string
  footerText: string
  onSave: (newValue: number) => void
}) {
  return (
    <>
      <div className="w-full rounded-xl p-2 border-2 bg-white">
        <div className="flex flex-row justify-around items-end mb-3">
          {icon}
          <span className="text-xl mb-2">
            <b>{title1}</b>
          </span>
          <span className="text-4xl mb-2">
            <b>{titleNumber}</b>
          </span>
          <span className="text-2xl mb-2">
            <b>{title2}</b>
          </span>
        </div>
        {isButtonVisible && (
          <BlockDialog
            {...blockDialog}
            defaultValue={defaultDialogValue}
            onSave={onSave}
          />
        )}
        <Progress value={progressValue} />
        <p className="text-center">{progressText}</p>
        <p className="text-center mt-2">{`Не забывай записывать ${footerText}!`}</p>
        <p className="text-center">Каждый день за это ты получаешь звёздочки!</p>
      </div>
    </>
  )
}
