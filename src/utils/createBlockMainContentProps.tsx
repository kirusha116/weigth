import type {
  Storage,
  StorageFullSetted,
  StorageSettedCallories,
  StorageSettedWeigth,
} from '@/types/Storage'
import { getDate } from './getDate'
import { toast } from 'sonner'

type Variant = 'weigth' | 'callories'
type BlockMainContentProps = {
  variant: Variant
  titleNumber: number
  isButtonVisible: boolean
  defaultDialogValue: string
  progressValue: number
  progressText: string
  onSave: (newValue: number) => void
}

export function createBlockMainContentProps(
  variant: Variant,
  {
    startWeigth,
    targetWeigth,
    currentWeigth,
    currentWeigthDate,
    balance,
    currentCallories,
    maxCallories,
    currentCalloriesDate,
  }: StorageSettedWeigth & StorageSettedCallories,
): BlockMainContentProps {
  const blockMainContentProps: { [key in Variant]: BlockMainContentProps } = {
    weigth: {
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
      } %.
                Цель - ${targetWeigth} кг.
                Осталось - ${Number(startWeigth) - Number(targetWeigth)} кг`,
      onSave: (newValue: number) => {
        const result: Pick<Storage, 'currentWeigth' | 'balance'> = {
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
    },
    callories: {
      variant: 'callories',
      titleNumber: currentCallories,
      isButtonVisible: true,
      defaultDialogValue: '',
      progressValue:
        currentCallories < maxCallories
          ? (currentCallories / maxCallories) * 100
          : 100,
      progressText: `Сегодня еще можно скушать - ${
        currentCallories < maxCallories ? maxCallories - currentCallories : 0
      } ккал`,
      onSave: (newValue: number) => {
        const result: Pick<
          Storage,
          'currentCallories' | 'balance' | 'currentCalloriesDate'
        > = {
          currentCallories: currentCallories + newValue,
          balance: balance,
          currentCalloriesDate: currentCalloriesDate,
        }
        if (currentCalloriesDate !== getDate()) {
          result.currentCalloriesDate = getDate()
          toast.success('Молодец! +100', {
            classNames: {
              toast:
                'flex justify-center !w-fit relative left-[50%] translate-x-[-50%] ',
              title: 'text-base ml-2 text-nowrap',
            },
          })
          result.balance = balance + 100
        }
        if (
          currentCallories <= maxCallories &&
          currentCallories + newValue > maxCallories
        ) {
          toast.warning('Переела! -200', {
            classNames: {
              toast:
                'flex justify-center !w-fit relative left-[50%] translate-x-[-50%] ',
              title: 'text-base ml-2 text-nowrap',
            },
          })
          result.balance = result.balance - 200
        }
        onSave(result)
      },
    },
  }
  return blockMainContentProps[variant]
}
