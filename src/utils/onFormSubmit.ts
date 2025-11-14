import { getDate } from './getDate'
import type { InForm, Storage } from '@/types/Storage'

export function onFormSubmit(
  data: Omit<InForm, 'name'>,
  startWeightDate: string | undefined,
) {
  const storage: Partial<Storage> = {}
  if (data.startWeight) storage.startWeight = Number(data.startWeight)
  if (data.targetWeight) storage.targetWeight = Number(data.targetWeight)
  if (data.maxCallories) storage.maxCallories = Number(data.maxCallories)

  if (!startWeightDate && storage.startWeight) {
    storage.startWeightDate = getDate()
    storage.currentWeightDate = storage.startWeightDate
    storage.currentWeight = storage.startWeight
  }

  return storage
}
