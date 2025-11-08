import { localKey } from './localKeys'

export function removeStorage(): void {
  localStorage.removeItem(localKey)
}
