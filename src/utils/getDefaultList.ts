import { auth, db } from '@/firebase'
import type { TaskOrAward } from '@/types/TaskOrAwards'
import { doc, setDoc } from 'firebase/firestore'

export const getDefaultList = async (variant: 'tasks' | 'awards') => {
  console.log('sf')
  const list = (await import(`@/constants/${variant}.ts`))[
    variant
  ] as TaskOrAward[]
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
