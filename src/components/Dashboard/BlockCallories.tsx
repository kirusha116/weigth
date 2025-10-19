import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { Block } from './Block'
import { BlockMainContent } from './BlockMainContent'
import type { StorageSettedCallories } from '@/types/Storage'
import { BlockNoData } from './BlockNoData'
import { handleSave } from '@/store/store'
import { createCalloriesProps } from '@/utils/createCalloriesProps'
import { useMediaQuery } from 'usehooks-ts'

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
