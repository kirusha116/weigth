export type Settings = {
  name: string
  startWeigth: string
  targetWeigth: string
}

export const settings = {
  name: 'name',
  startWeigth: 'startWeigth',
  targetWeigth: 'targetWeigth',
  maxCallories: 'maxCallories',
} as const

export const settingsLabels = {
  [settings.name]: 'Имя',
  [settings.startWeigth]: 'Начальный вес',
  [settings.targetWeigth]: 'Цель',
  [settings.maxCallories]: 'Допустимое количество каллорий в день',
} as const