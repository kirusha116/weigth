import BlockDialog from './BlockDialog'
import { Progress } from '../ui/progress'
import type { JSX } from 'react'
import { Carrot, Gauge } from 'lucide-react'

export type Variant = 'weigth' | 'callories'
type VariantProps = {
  [key in Variant]: {
    icon: JSX.Element
    title1: string
    title2: string
    blockDialog: { dialogTriggerText: string; dialogHeader: string }
    footerText: string
  }
}

export function BlockMainContent({
  isPad,
  variant,
  titleNumber,
  isButtonVisible,
  defaultDialogValue,
  progressValue,
  progressText,
  indicatorStyle,
  onSave,
}: {
  isPad: boolean
  variant: Variant
  titleNumber: number
  isButtonVisible: boolean
  defaultDialogValue: string
  progressValue: number
  progressText: string
  indicatorStyle: string
  onSave: (newValue: number) => void
}) {
  const variantProps: VariantProps = {
    weigth: {
      icon: <Gauge className="stroke-rose-300 size-14" />,
      title1: 'Текущий вес ',
      title2: 'кг',
      blockDialog: {
        dialogTriggerText: 'Записать результат взвешивания',
        dialogHeader: 'Запиши свой сегодняшний вес',
      },
      footerText: 'вес',
    },
    callories: {
      icon: <Carrot className="stroke-rose-300 size-14" />,
      title1: 'Калории дня ',
      title2: 'ккал',
      blockDialog: {
        dialogTriggerText: 'Добавить калории',
        dialogHeader: 'Запиши калории',
      },
      footerText: 'калории',
    },
  }

  return (
    <>
      {!isPad && (
        <div className="flex flex-row justify-around items-end mb-3">
          {variantProps[variant].icon}
          <div className="grow flex flex-row justify-center items-end">
            <p>
              <b className="text-xl mb-2">
                {variantProps[variant].title1 + ' -'}
              </b>
              <b className="text-4xl mb-2">{` ${titleNumber} `}</b>
              <b className="text-2xl mb-2">{variantProps[variant].title2}</b>
            </p>
          </div>
        </div>
      )}
      {isPad && (
        <div className="flex flex-row justify-around items-center mb-3">
          {variantProps[variant].icon}
          <div className="grow">
            <p className="text-xl text-center">
              <b>{variantProps[variant].title1}</b>
            </p>
            <p className="text-xl mb-1 text-center">
              <b className="text-4xl">{` ${titleNumber} `}</b>
              <b className="text-2xl">{variantProps[variant].title2}</b>
            </p>
          </div>
        </div>
      )}
      {isButtonVisible && (
        <BlockDialog
          variant={variant}
          {...variantProps[variant].blockDialog}
          defaultValue={defaultDialogValue}
          onSave={onSave}
        />
      )}
      <Progress value={progressValue} className={`mb-2 ${indicatorStyle}`} />
      <p className="text-center">
        {progressText}
      </p>
      <p className="text-center mt-2">{`Не забывай записывать ${variantProps[variant].footerText}!`}</p>
      <p className="text-center">{`Каждый день за это ты получаешь звёздочки!`}</p>
    </>
  )
}
