export function getDate(outerDate: number | null = null): string {
  const date = outerDate === null ? new Date() : new Date(outerDate)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
