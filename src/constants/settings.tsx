export type Settings = {
  name: string
  startWeight: string
  targetWeight: string
  maxCallories: string
}

export const settings = {
  name: 'name',
  startWeight: 'startWeight',
  targetWeight: 'targetWeight',
  maxCallories: 'maxCallories',
} as const

export const settingsLabels = {
  [settings.name]: 'Имя',
  [settings.startWeight]: 'Начальный вес',
  [settings.targetWeight]: 'Цель',
  [settings.maxCallories]: 'Допустимое количество каллорий в день',
} as const
