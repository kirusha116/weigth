import { Carrot } from 'lucide-react'
import type { BlockMainContentProps } from '@/types/BlockMainContentProps'

export function createCalloriesProps(
  isMobile: boolean,
  currentCallories: number,
  maxCallories: number,
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
  }
  return callories
}
