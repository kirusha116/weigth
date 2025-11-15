import '@/firebase'
import { auth, db } from '@/firebase'
import { getDate } from '@/utils/getDate'
import { doc, setDoc } from 'firebase/firestore'
import type { Storage } from '@/types/Storage'

export const saveStorage = async (storage: Storage) => {
  await setDoc(doc(db, auth.currentUser?.uid as string, getDate()), storage)
}
