import { getDate } from './getDate'
import type { InForm, Storage } from '@/types/Storage'

export function onFormSubmit(
  data: InForm,
  startWeigthDate: string | undefined,
) {
  const storage: Partial<Storage> = {}
  if (data.name) storage.name = data.name
  if (data.startWeigth) storage.startWeigth = Number(data.startWeigth)
  if (data.targetWeigth) storage.targetWeigth = Number(data.targetWeigth)
  if (data.maxCallories) storage.maxCallories = Number(data.maxCallories)

  if (!startWeigthDate && storage.startWeigth) {
    storage.startWeigthDate = getDate()
    storage.currentWeigthDate = storage.startWeigthDate
    storage.currentWeigth = storage.startWeigth
  }

  return storage
}
