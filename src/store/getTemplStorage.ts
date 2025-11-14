import { awards } from '@/constants/awards'
import { tasks } from '@/constants/tasks'
import type { Storage } from '@/types/Storage'
import { getDate } from '@/utils/getDate'
import { getRandomsId } from '@/utils/getRandomId'

export const emptyStorage: Storage = {
  startWeight: null,
  startWeightDate: null,
  targetWeight: null,
  maxCallories: null,
  currentWeight: null,
  currentWeightDate: null,
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

export const upDateStorage: Partial<Storage> = {
  currentCallories: 0,
  completedAwards: [],
  completedTasks: [],
  tasksDay: getRandomsId(tasks, 2),
  awardsDay: getRandomsId(awards, 1),
  lastDateOfLoad: getDate(),
  timestamp: Date.now(),
}
