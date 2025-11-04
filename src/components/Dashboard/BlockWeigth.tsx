import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { createWeigthProps } from '@/utils/createWeigthProps'
import type { StorageSettedWeigth } from '@/types/Storage'
import { handleSave } from '@/store/store'
import { useMediaQuery } from 'usehooks-ts'
import { lazy } from 'react'

const Block = lazy(() =>
  import('./Block').then(module => ({ default: module.Block })),
)
const BlockMainContent = lazy(() => import('./BlockMainContent'))
const BlockNoData = lazy(() => import('./BlockNoData'))

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
