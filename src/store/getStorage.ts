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
import { upDateStorage } from './getTemplStorage'

export const getStorage = async () => {
  let storage = null
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
    storage = result[0] as Storage
    if (storage && storage?.lastDateOfLoad !== getDate()) {
      storage = {
        ...(storage as Storage),
        ...upDateStorage,
      }
    }
  }
  return storage
}
