import { calloriesBlock, weigthBlock } from '@/constants/blockProps'
import { Block } from './Block'
import type { Storage } from '@/utils/workWithStorage'
import { BlockNoData } from './BlockNoData'
import { getDate } from '@/utils/getDate'
import { toast } from 'sonner'

export function Grid({
  currentWeigth,
  currentWeigthDate,
  startWeigth,
  targetWeigth,
  currentCallories,
  currentCalloriesDate,
  maxCallories,
  balance,
  onSave,
}: {
  currentWeigth?: number
  currentWeigthDate?: string
  startWeigth?: number
  targetWeigth?: number
  currentCallories?: number
  currentCalloriesDate?: string
  maxCallories?: number
  balance: number
  onSave: (newValuesObject: Partial<Storage>) => void
}) {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2 w-1/2">
        {startWeigth && targetWeigth ? (
          <Block
            {...weigthBlock}
            titleNumber={currentWeigth as number}
            isButtonVisible={currentWeigthDate !== getDate()}
            defaultDialogValue={(currentWeigth as number).toString()}
            progressValue={
              (currentWeigth as number) <= (startWeigth as number)
                ? Math.round(
                    (((startWeigth as number) - (currentWeigth as number)) /
                      ((startWeigth as number) - (targetWeigth as number))) *
                      1000,
                  ) / 10
                : 0
            }
            progressText={`Прогресс - ${
              (currentWeigth as number) <= (startWeigth as number)
                ? Math.round(
                    (((startWeigth as number) - (currentWeigth as number)) /
                      ((startWeigth as number) - (targetWeigth as number))) *
                      1000,
                  ) / 10
                : 0
            } %.
            Цель - ${targetWeigth} кг.
            Осталось - ${Number(startWeigth) - Number(targetWeigth)} кг`}
            onSave={newValue => {
              const result: Partial<Storage> = { currentWeigth: newValue }
              if (currentWeigthDate !== getDate()) {
                toast.success('Молодец! +100', {
                  classNames: {
                    toast:
                      'flex justify-center !w-fit relative left-[50%] translate-x-[-50%] ',
                    title: 'text-base ml-2 text-nowrap',
                  },
                })
                result.balance = balance + 100
              }
              onSave(result)
            }}
          />
        ) : (
          <BlockNoData
            variant="weigth"
            startWeigth={!startWeigth}
            targetWeigth={!targetWeigth}
          />
        )}
      </div>

      <div className="flex flex-col gap-2 w-1/2">
        {maxCallories ? (
          <Block
            {...calloriesBlock}
            titleNumber={currentCallories as number}
            isButtonVisible={true}
            defaultDialogValue={''}
            progressValue={
              (currentCallories as number) < (maxCallories as number)
                ? ((currentCallories as number) / (maxCallories as number)) *
                  100
                : 100
            }
            progressText={`Сегодня еще можно скушать - ${
              (currentCallories as number) < (maxCallories as number)
                ? (maxCallories as number) - (currentCallories as number)
                : 0
            } ккал`}
            onSave={newValue => {
              const result: Partial<Storage> = {
                currentCallories: (currentCallories as number) + newValue,
              }
              if (currentCalloriesDate !== getDate()) {
                console.log(getDate())
                console.log(currentCalloriesDate)
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
                (currentCallories as number) <= (maxCallories as number) &&
                (currentCallories as number) + newValue >
                  (maxCallories as number)
              ) {
                toast.warning('Переела! -200', {
                  classNames: {
                    toast:
                      'flex justify-center !w-fit relative left-[50%] translate-x-[-50%] ',
                    title: 'text-base ml-2 text-nowrap',
                  },
                })
                result.balance = (result.balance as number) - 200
              }
              onSave(result)
            }}
          />
        ) : (
          <BlockNoData variant="callories" />
        )}
      </div>
    </div>
  )
}
