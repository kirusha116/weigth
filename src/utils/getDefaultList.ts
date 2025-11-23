import { auth, db } from '@/firebase'
import type { TasksOrAward } from '@/types/TasksOrAwards'
import { doc, setDoc } from 'firebase/firestore'

export const getDefaultList = async (variant: 'tasks' | 'awards') => {
  const list = (await import(`@/constants/${variant}.ts`))[
    variant
  ] as TasksOrAward[]
  list.forEach(async elem => {
    await setDoc(
      doc(
        db,
        `${auth.currentUser?.uid}/tasksOrAwards/${variant}`,
        elem.id.toString(),
      ),
      elem,
    )
  })
  return list
}
