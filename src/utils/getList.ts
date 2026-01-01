import { auth, db } from '@/firebase'
import type { TasksOrAwards } from '@/types/TasksOrAwards'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export const getList = async (
  variant: 'tasks' | 'awards',
): Promise<TasksOrAwards[]> => {
  const q = query(
    collection(db, `${auth.currentUser?.uid}_new/${variant}`),
    orderBy('id'),
  )
  const querySnapshot = await getDocs(q)
  const result: TasksOrAwards[] = []
  querySnapshot.forEach(doc => {
    result.push(doc.data() as TasksOrAwards)
  })
  if (result.length) return result
  const { getDefaultList } = await import('@/utils/getDefaultList')
  return await getDefaultList(variant)
}
