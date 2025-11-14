import { settings, settingsLabels } from '@/constants/settings'
import { Input } from '../ui/input'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { Label } from '../ui/label'

export default function InputString({
  settingsKey,
  register,
}: {
  settingsKey: (typeof settings)[keyof typeof settings]
  register: UseFormRegisterReturn<(typeof settings)[keyof typeof settings]>
}) {
  return (
    <>
      <Label className="text-md">{settingsLabels[settingsKey]}</Label>
      <Input
        className="bg-white mt-2 mb-4"
        {...register}
        enterKeyHint="next"
      />
    </>
  )
}
