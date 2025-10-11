import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { Block } from './Block'
import { BlockNoData } from './BlockNoData'
import { BlockTasksOrAwardsDays } from './BlockTasksOrAwardsDays'
import { BlockMainContent } from './BlockMainContent'
import type {
  Storage,
  StorageSettedCallories,
  StorageSettedWeigth,
} from '@/types/Storage'
import { createWeigthProps } from '@/utils/createWeigthProps'
import { createCalloriesProps } from '@/utils/createCalloriesProps'
import { handleSave } from '@/store/store'

export function Grid() {
  const storage = useGetStorage()
  const {
    startWeigth,
    targetWeigth,
    maxCallories,
    startWeigthDate,
    currentWeigth,
    currentWeigthDate,
  } = storage
  const dispatch = useAppDispatch()
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2 w-1/2">
        <Block>
          {startWeigth &&
          targetWeigth &&
          startWeigthDate &&
          currentWeigth &&
          currentWeigthDate ? (
            <BlockMainContent
              {...createWeigthProps(
                storage as StorageSettedWeigth,
                (newObj: Partial<Storage>) => dispatch(handleSave(newObj)),
              )}
            />
          ) : (
            <BlockNoData
              variant="weigth"
              startWeigth={!startWeigth}
              targetWeigth={!targetWeigth}
            />
          )}
        </Block>
        <Block>
          <BlockTasksOrAwardsDays variant="tasks" />
        </Block>
      </div>

      <div className="flex flex-col gap-2 w-1/2">
        <Block>
          {maxCallories ? (
            <BlockMainContent
              {...createCalloriesProps(
                storage as StorageSettedCallories,
                (newObj: Partial<Storage>) => dispatch(handleSave(newObj)),
              )}
            />
          ) : (
            <BlockNoData variant="callories" />
          )}
        </Block>
        <Block>
          <BlockTasksOrAwardsDays variant="awards" />
        </Block>
      </div>
    </div>
  )
}
