import { currentStorage, temporarilyStorage } from './localKeys'

export function removeStorage(): void {
  localStorage.removeItem(currentStorage)
  localStorage.removeItem(temporarilyStorage)
}
