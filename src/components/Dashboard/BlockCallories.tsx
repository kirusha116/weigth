import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import type { StorageSettedCallories } from '@/types/Storage'
import { handleSave } from '@/store/store'
import { createCalloriesProps } from '@/utils/createCalloriesProps'
import { useMediaQuery } from 'usehooks-ts'
import { lazy } from 'react'

const Block = lazy(() =>
  import('./Block').then(module => ({ default: module.Block })),
)
const BlockMainContent = lazy(() => import('./BlockMainContent'))
const BlockNoData = lazy(() => import('./BlockNoData'))

export default function BlockCallories() {
  const storage = useGetStorage()
  const { maxCallories } = storage
  const dispatch = useAppDispatch()
  const isMobile = !useMediaQuery('(min-width: 768px), (max-width: 639.5px)')
  const isSmallMobile = !useMediaQuery('(min-width: 400.5px)')
  return (
    <Block>
      {maxCallories ? (
        <BlockMainContent
          {...createCalloriesProps(
            isMobile || isSmallMobile,
            storage as StorageSettedCallories,
            (newObj: Partial<Storage>) => dispatch(handleSave(newObj)),
          )}
        />
      ) : (
        <BlockNoData variant="callories" />
      )}
    </Block>
  )
}
