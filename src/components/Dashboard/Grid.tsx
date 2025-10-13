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
import { useMediaQuery } from 'usehooks-ts'

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
  const isPad = !useMediaQuery('(min-width: 1024px), (max-width: 640px)')
  const isMobile = !useMediaQuery('(min-width: 641px)')
  const haveBottomMenu = !useMediaQuery('(min-width: 768px)')
  const isSmallMobile = !useMediaQuery('(min-width: 400px)')
  console.log(isPad || isSmallMobile)
  return (
    <>
      {!isMobile && (
        <div className={`flex gap-2 ${haveBottomMenu ? 'mb-20' : ''}`}>
          <div
            className="flex flex-col gap-2"
            style={{ width: 'calc(50% - 4px)' }}
          >
            <Block>
              {startWeigth &&
              targetWeigth &&
              startWeigthDate &&
              currentWeigth &&
              currentWeigthDate ? (
                <BlockMainContent
                  isPad={isPad || isMobile}
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

          <div
            className="flex flex-col gap-2"
            style={{ width: 'calc(50% - 4px)' }}
          >
            <Block>
              {maxCallories ? (
                <BlockMainContent
                  isPad={isPad || isMobile}
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
      )}
      {isMobile && (
        <div className="flex flex-col gap-2 mb-20">
          <Block>
            {startWeigth &&
            targetWeigth &&
            startWeigthDate &&
            currentWeigth &&
            currentWeigthDate ? (
              <BlockMainContent
                isPad={isPad || isSmallMobile}
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
            {maxCallories ? (
              <BlockMainContent
                isPad={isPad || isSmallMobile}
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
            <BlockTasksOrAwardsDays variant="tasks" />
          </Block>
          <Block>
            <BlockTasksOrAwardsDays variant="awards" />
          </Block>
        </div>
      )}
    </>
  )
}
