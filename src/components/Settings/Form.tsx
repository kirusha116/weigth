import FormDefaultValues from '@/hooks/FormDefaultValues'
import { settings } from '@/constants/settings'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { InForm } from '@/types/InForm'
import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { handleSave } from '@/store/store'
import { lazy } from 'react'

const InputString = lazy(() => import('./InputString'))
const InputWeigth = lazy(() => import('./InputWeigth'))
const InputCallories = lazy(() => import('./InputCallories'))
const FormButtons = lazy(() => import('./FormButtons'))

export default function Form() {
  const dispatch = useAppDispatch()
  const { startWeigthDate } = useGetStorage()

  const { register, handleSubmit, reset, setValue } = useForm<InForm>(
    FormDefaultValues(),
  )

  const onSubmit: SubmitHandler<InForm> = async data => {
    const { onFormSubmit } = await import('@/utils/onFormSubmit')
    dispatch(handleSave(onFormSubmit(data, startWeigthDate)))
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
