import type { Storage, StorageSettedCallories } from '@/types/Storage'
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
  indicatorStyle: string
  onSave: (newValue: number) => void
}

type Result = Pick<
  Storage,
  'currentCallories' | 'balance' | 'currentCalloriesDate'
>

export function createCalloriesProps(
  {
    balance,
    currentCallories,
    maxCallories,
    currentCalloriesDate,
  }: StorageSettedCallories,
  onSave: (newObj: Pick<Storage, 'currentWeigth' | 'balance'>) => void,
): BlockMainContentProps {
  const callories: BlockMainContentProps = {
    variant: 'callories',

    titleNumber: currentCallories,

    isButtonVisible: true,

    defaultDialogValue: '',

    progressValue:
      currentCallories < maxCallories
        ? (currentCallories / maxCallories) * 100
        : 100,

    progressText: `Сегодня еще можно скушать - ${
      currentCallories < maxCallories
        ? Math.round(maxCallories - currentCallories)
        : 0
    } ккал`,

    indicatorStyle: `${
      currentCallories <= maxCallories ? 'bg-green-400' : 'bg-red-400'
    }`,

    onSave: (newValue: number) => {
      const result: Result = {
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
  }
  return callories
}
