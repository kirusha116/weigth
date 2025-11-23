import type { TasksOrAward } from '@/types/TasksOrAwards'

export function getRandomsId(arr: TasksOrAward[], length: number) {
  const result: number[] = []
  let i = 0
  while (i < length) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    if (!result.includes(randomIndex) && arr[randomIndex].display) {
      result.push(randomIndex)
      i++
    }
  }
  return result.map(index => arr[index].id)
}
