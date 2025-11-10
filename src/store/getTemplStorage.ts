import { awards } from '@/constants/awards'
import { tasks } from '@/constants/tasks'
import type { Storage } from '@/types/Storage'
import { getDate } from '@/utils/getDate'
import { getRandomsId } from '@/utils/getRandomId'

export function getEmptyStorage(): Storage {
  return {
    name: null,
    startWeigth: null,
    startWeigthDate: null,
    targetWeigth: null,
    maxCallories: null,
    currentWeigth: null,
    currentWeigthDate: null,
    currentCalloriesDate: null,
    currentCallories: 0,
    balance: 0,
    completedTasks: [],
    completedAwards: [],
    tasksDay: getRandomsId(tasks, 2),
    awardsDay: getRandomsId(awards, 1),
    lastDateOfLoad: getDate(),
    timestamp: Date.now(),
  }
}

export function getUpDateStorage(): Partial<Storage> {
  return {
    currentCallories: 0,
    completedAwards: [],
    completedTasks: [],
    tasksDay: getRandomsId(tasks, 2),
    awardsDay: getRandomsId(awards, 1),
    lastDateOfLoad: getDate(),
    timestamp: Date.now(),
  }
}
