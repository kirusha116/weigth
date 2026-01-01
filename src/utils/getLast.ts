import { auth, db } from '@/firebase'
import type { Target } from '@/types/Target'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'

export default async function getLast(target: Target) {
  const result: unknown[] = []
  if (auth.currentUser) {
    const responce = await getDocs(
      query(
        collection(db, `${auth.currentUser.uid}_new/${target}/${target}`),
        orderBy('timestamp', 'desc'),
        limit(1),
      ),
    )
    responce.forEach(el => result.push(el.data()))
  }
  return result[0]
}
