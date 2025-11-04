export type PartialStorage = {
  name?: string
  startWeigth?: number
  startWeigthDate?: string
  targetWeigth?: number
  maxCallories?: number
  currentWeigth?: number
  currentWeigthDate?: string
  currentCallories: number
  currentCalloriesDate: string
  balance: number
  tasksDay: number[]
  awardsDay: number[]
  completedTasks: number[]
  completedAwards: number[]
  lastDateOfLoad: string
  timestamp: number
}

type WeigthKeys =
  | 'startWeigth'
  | 'targetWeigth'
  | 'startWeigthDate'
  | 'currentWeigth'
  | 'currentWeigthDate'

export type StorageSettedWeigth = Omit<PartialStorage, WeigthKeys> &
  Required<Pick<PartialStorage, WeigthKeys>>

export type StorageSettedCallories = Omit<PartialStorage, 'maxCallories'> &
  Required<Pick<PartialStorage, 'maxCallories'>>

export type StorageFullSetted = Required<Omit<PartialStorage, 'name'>> &
  Partial<Pick<PartialStorage, 'name'>>

export type Storage =
  | PartialStorage
  | StorageSettedWeigth
  | StorageSettedCallories
  | StorageFullSetted
