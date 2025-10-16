import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { Block } from './Block'
import { BlockMainContent } from './BlockMainContent'
import type { StorageSettedCallories } from '@/types/Storage'
import { useMediaQuery } from 'usehooks-ts'
import { BlockNoData } from './BlockNoData'
import { handleSave } from '@/store/store'
import { createCalloriesProps } from '@/utils/createCalloriesProps'

export default function BlockCallories() {
  const storage = useGetStorage()
  const { maxCallories } = storage
  const dispatch = useAppDispatch()
  const isSmallMobile = !useMediaQuery('(min-width: 400px)')
  return (
    <Block>
      {maxCallories ? (
        <BlockMainContent
          isPad={isSmallMobile}
          {...createCalloriesProps(
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
