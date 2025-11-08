import { temporarilyStorage } from './localKeys'

export function hasTemporarilyStorage(): boolean {
  return !!localStorage.getItem(temporarilyStorage)
}
