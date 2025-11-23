import { auth, db } from '@/firebase'
import type { TasksOrAward } from '@/types/TasksOrAwards'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export const getList = async (
  variant: 'tasks' | 'awards',
): Promise<TasksOrAward[]> => {
  const q = query(
    collection(db, `${auth.currentUser?.uid}/tasksOrAwards/${variant}`),
    orderBy('id'),
  )
  const querySnapshot = await getDocs(q)
  const result: TasksOrAward[] = []
  querySnapshot.forEach(doc => {
    result.push(doc.data() as TasksOrAward)
  })
  if (result.length) return result
  const { getDefaultList } = await import('@/utils/getDefaultList')
  return await getDefaultList(variant)
}
