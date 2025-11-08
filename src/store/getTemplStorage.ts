import { awards } from '@/constants/awards'
import { tasks } from '@/constants/tasks'
import { getDate } from '@/utils/getDate'
import { getRandomsId } from '@/utils/getRandomId'

export function getEmptyStorage() {
  return {
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
}

export function getUpDateStorage() {
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
