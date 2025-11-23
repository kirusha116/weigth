import { auth, db } from '@/firebase'
import { doc, updateDoc } from 'firebase/firestore'

export const makeDisplayFalse = async (
  variant: 'tasks' | 'awards',
  id: number,
) => {
  if (auth.currentUser) {
    await updateDoc(
      doc(
        db,
        `${auth.currentUser.uid}/tasksOrAwards/${variant}`,
        id.toString(),
      ),
      { display: false },
    )
  }
}
