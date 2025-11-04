import type { Storage } from '@/types/Storage'
import { getRandomsId } from './getRandomId'
import { getDate } from './getDate'
import { tasks } from '@/constants/tasks'
import { awards } from '@/constants/awards'
const localKey = 'weigth'

function hasStorage(): boolean {
  return Boolean(localStorage.getItem(localKey as string))
}


export function saveStorage(storage: Storage) {
  localStorage.setItem(localKey, JSON.stringify(storage))
}

export function getStorage(): Storage {
  let storage: Storage
  if (!hasStorage()) {
    storage = {
      currentCallories: 0,
      currentCalloriesDate: '',
      balance: 0,
      completedTasks: [],
      completedAwards: [],
      tasksDay: getRandomsId(tasks, 2),
      awardsDay: getRandomsId(awards, 1),
      lastDateOfLoad: getDate(),
      timestamp: Date.now(),
    }
  } else {
    storage = JSON.parse(localStorage.getItem(localKey) as string)
    if (storage?.lastDateOfLoad !== getDate()) {
      storage = {
        ...storage,
        currentCallories: 0,
        completedAwards: [],
        completedTasks: [],
        tasksDay: getRandomsId(tasks, 2),
        awardsDay: getRandomsId(awards, 1),
        lastDateOfLoad: getDate(),
        timestamp: Date.now(),
      }
    }
  }
  saveStorage(storage)
  return storage
}

export function removeStorage(): void {
  localStorage.removeItem(localKey)
}
