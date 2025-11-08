import { localKey, temporarilyStorage } from './localKeys'

import '@/firebase'
import { db } from '@/firebase'
import type { Storage } from '@/types/Storage'
import { getDate } from '@/utils/getDate'
import successToast from '@/utils/successToast'
import warningToast from '@/utils/warningToast'
import { getAuth } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { hasTemporarilyStorage } from './hasTemporarilyStorage'

const auth = getAuth()

export function saveStorage(storage: Storage) {
  localStorage.setItem(localKey, JSON.stringify(storage))
  if (auth.currentUser) {
    dispatch(storage)
  } else {
    takeTemporarily(storage)
  }
}

const dispatch = async (storage: Storage) => {
  pushTemporarily()
  await setDoc(doc(db, auth.currentUser?.uid as string, getDate()), storage)
    .then(() => successToast('Сохранено'))
    .catch(() => {
      warningToast('Ошибка синхронизации')
    })
}

const getTemporarily = () => {
  if (hasTemporarilyStorage()) {
    return JSON.parse(localStorage.getItem(temporarilyStorage) as string)
  }
  return {}
}

const takeTemporarily = (storage: Storage) => {
  localStorage.setItem(
    temporarilyStorage,
    JSON.stringify({ ...getTemporarily(), [getDate()]: storage }),
  )
}

export const pushTemporarily = async () => {
  if (!hasTemporarilyStorage()) return
  const temporarily = Object.entries(getTemporarily())
  for (const [key, value] of temporarily) {
    try {
      await setDoc(doc(db, auth.currentUser?.uid as string, key), value)
    } catch (error) {
      warningToast('Ошибка синхронизации')
      throw error
    }
  }
}
