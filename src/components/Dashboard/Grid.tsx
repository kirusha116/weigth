import { calloriesBlock, weigthBlock } from '@/constants/blockProps'
import { Block } from './Block'
import type { Storage } from '@/utils/workWithStorage'
import { BlockNoData } from './BlockNoData'

export function Grid({
  currentWeigth,
  startWeigth,
  targetWeigth,
  currentCallories,
  maxCallories,
  onSave,
}: {
  currentWeigth?: number
  startWeigth?: number
  targetWeigth?: number
  currentCallories?: number
  maxCallories?: number
  onSave: (newValuesObject: Partial<Storage>) => void
}) {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2 w-1/2">
        {startWeigth && targetWeigth ? (
          <Block
            {...weigthBlock}
            titleNumber={currentWeigth as number}
            isButtonVisible={Boolean(startWeigth && targetWeigth)}
            defaultDialogValue={(currentWeigth as number).toString()}
            progressValue={
              (((startWeigth as number) - (currentWeigth as number)) /
                ((startWeigth as number) - (targetWeigth as number))) *
              100
            }
            progressText={`Прогресс - ${
              (((startWeigth as number) - (currentWeigth as number)) /
                ((startWeigth as number) - (targetWeigth as number))) *
              100
            }%.
            Цель - ${targetWeigth}.
            Осталось - ${Number(targetWeigth) - Number(targetWeigth)}кг`}
            onSave={newValue => onSave({ currentWeigth: newValue })}
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
              ((currentCallories as number) / (maxCallories as number)) * 100
            }
            progressText={`Сегодня еще можно скушать - ${
              (maxCallories as number) - (currentCallories as number)
            }`}
            onSave={newValue =>
              onSave({
                currentCallories: (currentCallories as number) + newValue,
              })
            }
          />
        ) : (
          <BlockNoData variant="callories" />
        )}
      </div>
    </div>
  )
}
