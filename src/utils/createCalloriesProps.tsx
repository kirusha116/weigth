import type { Storage, StorageSettedCallories } from '@/types/Storage'
import { getDate } from './getDate'
import { toast } from 'sonner'
import { Carrot } from 'lucide-react'
import type { BlockMainContentProps } from '@/types/BlockMainContentProps'

type Result = Pick<
  Storage,
  'currentCallories' | 'balance' | 'currentCalloriesDate'
>

export function createCalloriesProps(
  isMobile: boolean,
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

    icon: <Carrot className="stroke-rose-300 size-14" />,

    title1: 'Калории дня ',

    title2: 'ккал',

    dialogTriggerText: 'Добавить калории',

    dialogHeader: 'Запиши калории',

    footerText: 'калории',

    titleNumber: currentCallories,

    isButtonVisible: true,

    defaultDialogValue: '',

    progressValue:
      currentCallories < maxCallories
        ? (currentCallories / maxCallories) * 100
        : 100,

    progressText: `${isMobile ? 'М' : 'Сегодня еще м'}ожно скушать - ${
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
