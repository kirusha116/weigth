import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { Block } from './Block'
import { BlockMainContent } from './BlockMainContent'
import { createWeigthProps } from '@/utils/createWeigthProps'
import type { StorageSettedWeigth } from '@/types/Storage'
import { useMediaQuery } from 'usehooks-ts'
import { BlockNoData } from './BlockNoData'
import { handleSave } from '@/store/store'

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
  const isSmallMobile = !useMediaQuery('(min-width: 400px)')
  return (
    <Block>
      {startWeigth &&
      targetWeigth &&
      startWeigthDate &&
      currentWeigth &&
      currentWeigthDate ? (
        <BlockMainContent
          isPad={isSmallMobile}
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
  )
}
