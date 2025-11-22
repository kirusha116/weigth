import { auth, db } from '@/firebase'
import type { TaskOrAward } from '@/types/TaskOrAwards'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export const getList = async (
  variant: 'tasks' | 'awards',
): Promise<TaskOrAward[]> => {
  const q = query(
    collection(db, `${auth.currentUser?.uid}/tasksOrAwards/${variant}`),
    orderBy('id'),
  )
  const querySnapshot = await getDocs(q)
  const result: TaskOrAward[] = []
  querySnapshot.forEach(doc => {
    result.push(doc.data() as TaskOrAward)
  })
  if (result.length) return result
  const { getDefaultList } = await import('@/utils/getDefaultList')
  return await getDefaultList(variant)
}
