import { auth, db } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { getDate } from './getDate'
import type { Target } from '@/types/Target'

export default async function setLast(
  data: unknown,
  target: Target,
  action: ((data: unknown) => void) | null = null,
) {
  if (auth.currentUser) {
    const empty = { data: data, timestamp: Date.now() }
    await setDoc(
      doc(
        db,
        `${auth.currentUser.uid}_new/${target}/${target}`,
        getDate(empty.timestamp),
      ),
      empty,
    )
    if (action !== null) action(empty)
  }
}
