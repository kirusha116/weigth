import type { Storage, StorageSettedWeigth } from '@/types/Storage'
import { getDate } from './getDate'
import { toast } from 'sonner'
import { Gauge } from 'lucide-react'
import type { BlockMainContentProps } from '@/types/BlockMainContentProps'

type Result = Pick<Storage, 'currentWeigth' | 'balance' | 'currentWeigthDate'>

export function createWeigthProps(
  isMobile: boolean,
  {
    startWeigth,
    targetWeigth,
    currentWeigth,
    currentWeigthDate,
    balance,
  }: StorageSettedWeigth,
  onSave: (newObj: Pick<Storage, 'currentWeigth' | 'balance'>) => void,
): BlockMainContentProps {
  const weigth: BlockMainContentProps = {
    variant: 'weigth',

    icon: <Gauge className="stroke-rose-300 size-14" />,

    title1: 'Текущий вес ',

    title2: 'кг',

    dialogTriggerText: `${isMobile ? 'Р' : 'Записать р'}езультат взвешивания`,

    dialogHeader: 'Запиши свой сегодняшний вес',

    footerText: 'вес',

    titleNumber: currentWeigth,

    isButtonVisible: currentWeigthDate !== getDate(),

    defaultDialogValue: currentWeigth.toString(),

    progressValue:
      currentWeigth <= startWeigth
        ? Math.round(
            ((startWeigth - currentWeigth) / (startWeigth - targetWeigth)) *
              1000,
          ) / 10
        : 0,

    progressText: `Прогресс\u00A0\u2011\u00A0${
      currentWeigth <= startWeigth
        ? Math.round(
            ((startWeigth - currentWeigth) / (startWeigth - targetWeigth)) *
              1000,
          ) / 10
        : 0
    }\u00A0%. Цель\u00A0\u2011\u00A0${targetWeigth}\u00A0кг. Осталось\u00A0\u2011\u00A0${
      Math.round((startWeigth - targetWeigth) * 10) / 10
    }\u00A0кг`,

    indicatorStyle: 'bg-gradient-to-r from-red-400 via-yellow-400 to-green-400',

    onSave: (newValue: number) => {
      const result: Result = {
        currentWeigth: newValue,
        balance: balance,
      }
      if (currentWeigthDate !== getDate()) {
        result.currentWeigthDate = getDate()
        toast.success('Молодец! +100', {
          classNames: {
            toast:
              'flex justify-center !w-fit relative left-[50%] translate-x-[-50%] ',
            title: 'text-base ml-2 text-nowrap',
          },
        })
        result.balance += 100
      }
      onSave(result)
    },
  }
  return weigth
}
