import { Carrot, Gauge } from 'lucide-react'
export const weigthBlock = {
  icon: <Gauge className="stroke-rose-300 size-14" />,
  title1: 'Текущий вес -',
  title2: 'кг',
  blockDialog: {
    dialogTriggerText: 'Записать результат взвешивания',
    dialogHeader: 'Запиши свой сегодняшний вес',
  },
  footerText: 'вес',
}
export const calloriesBlock = {
  icon: <Carrot className="stroke-rose-300 size-14" />,
  title1: 'Калории дня -',
  title2: 'ккал',
  blockDialog: {
    dialogTriggerText: 'Добавить калории',
    dialogHeader: 'Запиши калории',
  },
  footerText: 'калории',
}
