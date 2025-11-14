import '@/firebase'
import { auth, db } from '@/firebase'
import { getDate } from '@/utils/getDate'
import { doc, setDoc } from 'firebase/firestore'
import { currentStorage, temporarilyStorage } from './localKeys'
import type { Storage } from '@/types/Storage'

export const saveStorage = async (storage: Storage) => {
  if (auth.currentUser) {
    await setDoc(doc(db, auth.currentUser.uid, getDate()), storage)
  } else {
    localStorage.setItem(currentStorage, JSON.stringify(storage))
    const hasStorage = localStorage.getItem(temporarilyStorage)

    if (hasStorage) {
      const localTemporarilyStorage = JSON.parse(hasStorage)
      localStorage.setItem(
        temporarilyStorage,
        JSON.stringify({ ...localTemporarilyStorage, [getDate()]: storage }),
      )
    } else {
      localStorage.setItem(
        temporarilyStorage,
        JSON.stringify({ [getDate()]: storage }),
      )
    }
  }
}
