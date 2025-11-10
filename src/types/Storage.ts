export type Storage = {
  name: string | null
  startWeigth: number | null
  startWeigthDate: string | null
  targetWeigth: number | null
  maxCallories: number | null
  currentWeigth: number | null
  currentWeigthDate: string | null
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
  startWeigth: string | null | undefined
  targetWeigth: string | null | undefined
  maxCallories: string | null | undefined
}
