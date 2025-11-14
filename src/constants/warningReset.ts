import { removeStorage } from '@/store/removeStorage'

export const getParams = (
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return {
    title: 'Точно? Точно?',
    description: 'Все данные будут удалены! Придется начать сначала!',
    firstBtnText: 'Отмена',
    firstBtnClick: () => onOpenChange(false),
    secondBtnText: 'Удалить',
    secondBtnClick: () => {
      removeStorage()
      setTimeout(() => {
        location.assign('/weight')
      }, 400)
    },
  }
}
