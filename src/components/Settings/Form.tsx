import { settings } from '@/constants/settings'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { handleSave } from '@/store/store'
import { lazy, useEffect } from 'react'
import { onFormSubmit } from '@/utils/onFormSubmit'
import type { InForm } from '@/types/Storage'

const InputString = lazy(() => import('./InputString'))
const InputWeigth = lazy(() => import('./InputWeigth'))
const InputCallories = lazy(() => import('./InputCallories'))
const FormButtons = lazy(() => import('./FormButtons'))

export default function Form() {
  const dispatch = useAppDispatch()
  const { name, startWeigth, targetWeigth, maxCallories, startWeigthDate } =
    useGetStorage() ?? {}

  const { register, handleSubmit, reset, setValue } = useForm<InForm>({
    defaultValues: {
      name,
      startWeigth: startWeigth?.toString(),
      targetWeigth: targetWeigth?.toString(),
      maxCallories: maxCallories?.toString(),
    },
  })
  useEffect(() => {
    setValue('name', name as string)
    setValue('startWeigth', startWeigth?.toString() as string)
    setValue('targetWeigth', targetWeigth?.toString() as string)
    setValue('maxCallories', maxCallories?.toString() as string)
  })

  const onSubmit: SubmitHandler<InForm> = async data => {
    dispatch(handleSave(onFormSubmit(data, startWeigthDate as string)))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputString
        settingsKey={settings.name}
        register={register(settings.name)}
      />

      <InputWeigth
        settingsKey={settings.startWeigth}
        register={register(settings.startWeigth)}
        setValue={setValue}
      />

      <InputWeigth
        settingsKey={settings.targetWeigth}
        register={register(settings.targetWeigth)}
        setValue={setValue}
      />

      <InputCallories
        settingsKey={settings.maxCallories}
        register={register(settings.maxCallories)}
        setValue={setValue}
      />

      <FormButtons reset={reset} />
    </form>
  )
}
