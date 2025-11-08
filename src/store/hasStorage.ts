import { localKey } from './localKeys'

export function hasStorage(): boolean {
  return !!localStorage.getItem(localKey)
}
