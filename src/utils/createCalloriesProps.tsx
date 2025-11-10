import type { Storage } from '@/types/Storage'
import { getDate } from './getDate'
import { Carrot } from 'lucide-react'
import type { BlockMainContentProps } from '@/types/BlockMainContentProps'
import successToast from './successToast'
import warningToast from './warningToast'

type Result = Pick<
  { [K in keyof Storage]: NonNullable<Storage[K]> },
  'currentCallories' | 'balance' | 'currentCalloriesDate'
>

export function createCalloriesProps(
  isMobile: boolean,
  {
    balance,
    currentCallories,
    maxCallories,
    currentCalloriesDate,
  }: Pick<
    { [K in keyof Storage]: NonNullable<Storage[K]> },
    'balance' | 'currentCallories' | 'maxCallories' | 'currentCalloriesDate'
  >,
  onSave: (
    newObj: Pick<
      Storage,
      'currentCallories' | 'balance' | 'currentCalloriesDate'
    >,
  ) => void,
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
        successToast('Молодец! +100')
        result.balance = balance + 100
      }
      if (
        currentCallories <= maxCallories &&
        currentCallories + newValue > maxCallories
      ) {
        warningToast('Переела! -200')
        result.balance = result.balance - 200
      }
      onSave(result)
    },
  }
  return callories
}
