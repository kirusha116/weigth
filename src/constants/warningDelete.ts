import { auth, db } from '@/firebase'
import { currentStorage, temporarilyStorage } from '@/store/localKeys'
import successToast from '@/utils/successToast'
import { doc, setDoc } from 'firebase/firestore'

export const getParams = (
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const onClick = () => {
    localStorage.removeItem(currentStorage)
    localStorage.removeItem(temporarilyStorage)
    onOpenChange(false)
    successToast('Успешно')
  }
  return {
    title: 'Сохранить данные с устройства?',
    description: 'Если нет, то они будут полностью удалены',
    firstBtnText: 'Нет',
    firstBtnClick: () => {
      onOpenChange(false)
    },
    secondBtnText: 'Да',
    secondBtnClick: async () => {
      const StorageObject = JSON.parse(
        localStorage.getItem(temporarilyStorage) as string,
      ) as Record<string, Storage>
      Object.entries(StorageObject).forEach(async ([date, storage]) => {
        if (auth.currentUser) {
          await setDoc(doc(db, auth.currentUser.uid, date), storage)
          onClick()
        }
      })
    },
  }
}
