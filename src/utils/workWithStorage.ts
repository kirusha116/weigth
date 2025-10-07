import type { settings } from '@/constants/settings'

export const localKey = 'weigth'

export type Storage = {
  [settings.name]: string
  [settings.startWeigth]: number
  [settings.targetWeigth]: number
  [settings.maxCallories]: number
  startWeigthDate: string
  currentWeigth: number
  currentWeigthDate: string
  currentCallories: number
  currentCalloriesDate: string
  balance: number
}

export function getStorage(): Partial<Storage> {
  return JSON.parse(localStorage.getItem(localKey) as string)
}

export function saveStorage(storage: Partial<Storage>): void {
  localStorage.setItem(localKey, JSON.stringify(storage))
}

export function removeStorage(): void {
  localStorage.removeItem(localKey)
}
