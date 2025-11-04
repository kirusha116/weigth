import { useGetStorage } from './storageHooks'

export default function FormDefaultValues() {
  const { name, startWeigth, targetWeigth, maxCallories } = useGetStorage()
  return {
    defaultValues: {
      name,
      startWeigth: startWeigth?.toString(),
      targetWeigth: targetWeigth?.toString(),
      maxCallories: maxCallories?.toString(),
    },
  }
}
