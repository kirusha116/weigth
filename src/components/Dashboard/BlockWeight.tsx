import { createWeightProps } from '@/utils/createWeightProps'
import { useMediaQuery } from 'usehooks-ts'
import { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import getLast from '@/utils/getLast'
import { auth } from '@/firebase'
import { getDate } from '@/utils/getDate'
import { useDispatch } from 'react-redux'
import { updateBalance } from '@/store/store'
import type { BlockMainContentProps } from '@/types/BlockMainContentProps'
import setLast from '@/utils/setLast'

const Block = lazy(() =>
  import('./Block').then(module => ({ default: module.Block })),
)
const BlockMainContent = lazy(() => import('./BlockMainContent'))
const BlockNoData = lazy(() => import('./BlockNoData'))

type ReceivedData = { data: number; timestamp: number }

function BlockWeight() {
  const isMobile = !useMediaQuery('(min-width: 768px), (max-width: 639.5px)')
  const isSmallMobile = !useMediaQuery('(min-width: 400.5px)')
  const dispatch = useDispatch()

  const [currentWeight, setCurrentWeight] = useState<number | null>(null)
  const [currentWeightDate, setCurrentWeightDate] = useState<number | null>(
    null,
  )
  const [startWeight, setStartWeight] = useState<number | null>(null)
  const [targetWeight, setTargetWeight] = useState<number | null>(null)
  const [isDownloaded, setIsDownLoaded] = useState<boolean>(false)

  useEffect(() => {
    const get = async () => {
      const actions = [
        (data: ReceivedData) => {
          setCurrentWeight(data.data)
          setCurrentWeightDate(data.timestamp)
        },
        (data: ReceivedData) => {
          setStartWeight(data.data)
        },
        (data: ReceivedData) => {
          setTargetWeight(data.data)
        },
      ]
      const responce = await Promise.all([
        getLast('currentWeight') as unknown as ReceivedData | undefined,
        getLast('startWeight') as unknown as ReceivedData | undefined,
        getLast('targetWeight') as unknown as ReceivedData | undefined,
      ])
      responce.forEach(async (data, index) => {
        if (data !== undefined) {
          actions[index](data)
          return
        }
      })
      if (
        responce[0] === undefined &&
        responce[1] !== undefined &&
        responce[2] !== undefined
      ) {
        const setLast = (await import('@/utils/setLast')).default
        setLast(
          responce[1].data,
          'currentWeight',
          actions[0] as (data: unknown) => void,
        )
      }
      setIsDownLoaded(true)
    }
    get()
  }, [])

  const props: BlockMainContentProps | null = useMemo(() => {
    if (currentWeight && currentWeightDate && startWeight && targetWeight)
      return createWeightProps(
        isMobile || isSmallMobile,
        currentWeight,
        getDate(currentWeightDate),
        startWeight,
        targetWeight,
      )
    return null
  }, [
    currentWeight,
    currentWeightDate,
    isMobile,
    isSmallMobile,
    startWeight,
    targetWeight,
  ])

  const onSave = useCallback(
    async (newValue: number) => {
      const timestamp = Date.now()
      dispatch(updateBalance(200))
      if (auth.currentUser) setLast(newValue, 'currentWeight')
      setCurrentWeight(newValue)
      setCurrentWeightDate(timestamp)
    },
    [dispatch],
  )

  return (
    <>
      {isDownloaded && (
        <Block>
          {startWeight && targetWeight && props ? (
            <BlockMainContent {...props} onSave={onSave} />
          ) : (
            <BlockNoData
              variant="weight"
              startWeight={!startWeight}
              targetWeight={!targetWeight}
            />
          )}
        </Block>
      )}
    </>
  )
}

export default memo(BlockWeight)
