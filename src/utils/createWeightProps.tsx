import { getDate } from './getDate'
import { Gauge } from 'lucide-react'
import type { BlockMainContentProps } from '@/types/BlockMainContentProps'

export function createWeightProps(
  isMobile: boolean,
  currentWeight: number,
  currentWeightDate: string,
  startWeight: number,
  targetWeight: number,
): BlockMainContentProps {
  const weight: BlockMainContentProps = {
    variant: 'weight',

    icon: <Gauge className="stroke-rose-300 size-14" />,

    title1: 'Текущий вес ',

    title2: 'кг',

    dialogTriggerText: `${isMobile ? 'Р' : 'Записать р'}езультат взвешивания`,

    dialogHeader: 'Запиши свой сегодняшний вес',

    footerText: 'вес',

    titleNumber: currentWeight,

    isButtonVisible: currentWeightDate !== getDate(),

    defaultDialogValue: currentWeight.toString(),

    progressValue:
      currentWeight <= startWeight
        ? Math.round(
            ((startWeight - currentWeight) / (startWeight - targetWeight)) *
              1000,
          ) / 10
        : 0,

    progressText: `Прогресс\u00A0\u2011\u00A0${
      currentWeight <= startWeight
        ? Math.round(
            ((startWeight - currentWeight) / (startWeight - targetWeight)) *
              1000,
          ) / 10
        : 0
    }\u00A0%. Цель\u00A0\u2011\u00A0${targetWeight}\u00A0кг. Осталось\u00A0\u2011\u00A0${
      Math.round((startWeight - targetWeight) * 10) / 10
    }\u00A0кг`,

    indicatorStyle: 'bg-gradient-to-r from-red-400 via-yellow-400 to-green-400',
  }
  return weight
}
