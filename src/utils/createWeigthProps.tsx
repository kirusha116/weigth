import type { Storage, StorageSettedWeigth } from '@/types/Storage'
import { getDate } from './getDate'
import { toast } from 'sonner'

type BlockMainContentProps = {
  variant: 'weigth' | 'callories'
  titleNumber: number
  isButtonVisible: boolean
  defaultDialogValue: string
  progressValue: number
  progressText: string
  indicatorStyle: string
  onSave: (newValue: number) => void
}

type Result = Pick<Storage, 'currentWeigth' | 'balance'>

export function createWeigthProps(
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

    progressText: `Прогресс - ${
      currentWeigth <= startWeigth
        ? Math.round(
            ((startWeigth - currentWeigth) / (startWeigth - targetWeigth)) *
              1000,
          ) / 10
        : 0
    } %. Цель - ${targetWeigth} кг. Осталось - ${
      Math.round((startWeigth - targetWeigth) * 10) / 10
    } кг`,

    indicatorStyle: 'bg-gradient-to-r from-red-400 via-yellow-400 to-green-400',

    onSave: (newValue: number) => {
      const result: Result = {
        currentWeigth: newValue,
        balance: balance,
      }
      if (currentWeigthDate !== getDate()) {
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
