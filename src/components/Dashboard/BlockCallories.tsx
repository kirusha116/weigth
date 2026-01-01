import { useAppDispatch } from '@/hooks/storeHooks'
import { updateBalance } from '@/store/store'
import { createCalloriesProps } from '@/utils/createCalloriesProps'
import { useMediaQuery } from 'usehooks-ts'
import { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import getLast from '@/utils/getLast'
import { getDate } from '@/utils/getDate'
import setLast from '@/utils/setLast'
import warningToast from '@/utils/warningToast'

const Block = lazy(() =>
  import('./Block').then(module => ({ default: module.Block })),
)
const BlockMainContent = lazy(() => import('./BlockMainContent'))
const BlockNoData = lazy(() => import('./BlockNoData'))

type ReceivedData = { data: number; timestamp: number }

function BlockCallories() {
  const isMobile = !useMediaQuery('(min-width: 768px), (max-width: 639.5px)')
  const isSmallMobile = !useMediaQuery('(min-width: 400.5px)')

  const [currentCallories, setCurrentCallories] = useState<number | null>(null)
  const [maxCallories, setMaxCallories] = useState<number | null>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const get = async () => {
      const maxCallories = (await getLast('maxCallories')) as ReceivedData
      if (maxCallories !== undefined) {
        setMaxCallories(maxCallories.data)
        const currentCallories = (await getLast(
          'currentCallories',
        )) as ReceivedData
        if (
          currentCallories === undefined ||
          getDate(currentCallories.timestamp) !== getDate()
        ) {
          const setLast = (await import('@/utils/setLast')).default
          setLast(
            0,
            'currentCallories',
            setCurrentCallories as (data: unknown) => void,
          )
        } else setCurrentCallories(currentCallories.data)
      } else return
    }
    get()
  }, [])

  const props = useMemo(() => {
    if (currentCallories === null || maxCallories === null) return null
    return createCalloriesProps(
      isMobile || isSmallMobile,
      currentCallories,
      maxCallories,
    )
  }, [currentCallories, isMobile, isSmallMobile, maxCallories])

  const onSave = useCallback(
    async (newValue: number) => {
      if (currentCallories === null || maxCallories === null) return
      if (newValue && !currentCallories) dispatch(updateBalance(100))
      if (newValue + currentCallories > maxCallories) {
        dispatch(updateBalance(-200))
        warningToast('Переела! -200')
      }
      setLast(
        currentCallories + newValue,
        'currentCallories',
        setCurrentCallories as (data: unknown) => void,
      )
    },
    [currentCallories, dispatch, maxCallories],
  )

  return (
    <Block>
      {maxCallories && currentCallories && props ? (
        <BlockMainContent {...props} onSave={onSave} />
      ) : (
        <BlockNoData variant="callories" />
      )}
    </Block>
  )
}
export default memo(BlockCallories)
