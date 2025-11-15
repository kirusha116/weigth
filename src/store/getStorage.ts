import { getDate } from '@/utils/getDate'
import type { Storage } from '@/types/Storage'
import '@/firebase'
import { auth, db } from '@/firebase'
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  type DocumentData,
} from 'firebase/firestore'
import { currentStorage } from './localKeys'
import { upDateStorage } from './getTemplStorage'

export const getServerStorage = async () => {
  if (auth.currentUser) {
    const result: DocumentData[] = []
    const q = query(
      collection(db, auth.currentUser.uid),
      orderBy('timestamp', 'desc'),
      limit(1),
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      result.push(doc.data())
    })
    return result[0] as Storage
  }
}

export const getStorage = async (): Promise<Storage> => {
  let storage: Storage | null = null

  if (auth.currentUser) {
    storage = (await getServerStorage()) as unknown as Storage
  } else {
    if (localStorage.getItem(currentStorage)) {
      storage = JSON.parse(localStorage.getItem(currentStorage) as string)
    } else {
      storage = (await import('./getTemplStorage')).emptyStorage
    }
  }

  if (storage?.lastDateOfLoad !== getDate()) {
    storage = {
      ...(storage as Storage),
      ...upDateStorage,
    }
  }
  return storage
}
