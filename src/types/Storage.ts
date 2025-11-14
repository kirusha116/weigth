export type Storage = {
  startWeight: number | null
  startWeightDate: string | null
  targetWeight: number | null
  maxCallories: number | null
  currentWeight: number | null
  currentWeightDate: string | null
  currentCalloriesDate: string | null
  currentCallories: number
  balance: number
  tasksDay: number[]
  awardsDay: number[]
  completedTasks: number[]
  completedAwards: number[]
  lastDateOfLoad: string
  timestamp: number
}

export type InForm = {
  name: string | null | undefined
  startWeight: string | null | undefined
  targetWeight: string | null | undefined
  maxCallories: string | null | undefined
}
