import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { Block } from './Block'
import { BlockMainContent } from './BlockMainContent'
import { createWeigthProps } from '@/utils/createWeigthProps'
import type { StorageSettedWeigth } from '@/types/Storage'
import { BlockNoData } from './BlockNoData'
import { handleSave } from '@/store/store'
import { useMediaQuery } from 'usehooks-ts'

export default function BlockWeigth() {
  const storage = useGetStorage()
  const {
    startWeigth,
    targetWeigth,
    startWeigthDate,
    currentWeigth,
    currentWeigthDate,
  } = storage
  const dispatch = useAppDispatch()
  const isMobile = !useMediaQuery('(min-width: 768px), (max-width: 639.5px)')
  const isSmallMobile = !useMediaQuery('(min-width: 400.5px)')
  return (
    <Block>
      {startWeigth &&
      targetWeigth &&
      startWeigthDate &&
      currentWeigth &&
      currentWeigthDate ? (
        <BlockMainContent
          {...createWeigthProps(
            isMobile || isSmallMobile,
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
  )
}
