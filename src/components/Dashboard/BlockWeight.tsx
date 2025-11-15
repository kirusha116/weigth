import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { createWeightProps } from '@/utils/createWeightProps'
import { handleSave } from '@/store/store'
import { useMediaQuery } from 'usehooks-ts'
import { lazy } from 'react'
import type { Storage } from '@/types/Storage'

const Block = lazy(() =>
  import('./Block').then(module => ({ default: module.Block })),
)
const BlockMainContent = lazy(() => import('./BlockMainContent'))
const BlockNoData = lazy(() => import('./BlockNoData'))

export default function BlockWeight() {
  const storage = useGetStorage()
  const {
    startWeight,
    targetWeight,
    startWeightDate,
    currentWeight,
    currentWeightDate,
  } = storage
  const isMobile = !useMediaQuery('(min-width: 768px), (max-width: 639.5px)')
  const isSmallMobile = !useMediaQuery('(min-width: 400.5px)')
  const dispatch = useAppDispatch()
  return (
    <Block>
      {startWeight &&
      targetWeight &&
      startWeightDate &&
      currentWeight &&
      currentWeightDate ? (
        <BlockMainContent
          {...createWeightProps(
            isMobile || isSmallMobile,
            storage as { [K in keyof Storage]: NonNullable<Storage[K]> },
            (newObj: Partial<Storage>) => dispatch(handleSave(newObj)),
          )}
        />
      ) : (
        <BlockNoData
          variant="weight"
          startWeight={!startWeight}
          targetWeight={!targetWeight}
        />
      )}
    </Block>
  )
}
