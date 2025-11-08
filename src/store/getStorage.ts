import { hasStorage } from './hasStorage'
import { getDate } from '@/utils/getDate'
import { localKey } from './localKeys'
import { pushTemporarily, saveStorage } from './saveStorage'
import type { Storage } from '@/types/Storage'
import { getEmptyStorage, getUpDateStorage } from './getTemplStorage'
import { hasTemporarilyStorage } from './hasTemporarilyStorage'
import '@/firebase'
import { db } from '@/firebase'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const auth = getAuth()

export const getServerStorage = async () => {
  if (auth.currentUser) {
    const result: Storage[] = []
    const citiesRef = collection(db, auth.currentUser.uid)
    const q = query(citiesRef, orderBy('timestamp', 'desc'), limit(1))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      result.push(doc.data() as Storage)
    })
    return result[0] as Storage
  }
}

export function getStorage(): Storage {
  if (hasTemporarilyStorage()) pushTemporarily()

  let storage: Storage | null = null
  const serverStorage: Storage | undefined =
    getServerStorage() as unknown as Storage

  if (!hasStorage() && !serverStorage) {
    storage = getEmptyStorage()
  } else if (!serverStorage) {
    storage = JSON.parse(localStorage.getItem(localKey) as string)
  } else if (!hasStorage()) {
    storage = serverStorage as unknown as Storage
  } else if (
    serverStorage.timestamp >
    JSON.parse(localStorage.getItem(localKey) as string).timestamp
  ) {
    storage = serverStorage
    saveStorage(storage)
  } else {
  }

  if (storage?.lastDateOfLoad !== getDate()) {
    storage = {
      ...storage,
      ...getUpDateStorage(),
    }
    saveStorage(storage)
  }

  return storage
}
