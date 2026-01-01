import { settings } from '@/constants/settings'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { lazy, useEffect } from 'react'
import type { InForm } from '@/types/Storage'
import { auth } from '@/firebase'
import { updateProfile, type User } from 'firebase/auth'
import successToast from '@/utils/successToast'
import getLast from '@/utils/getLast'
import setLast from '@/utils/setLast'

const InputString = lazy(() => import('./InputString'))
const InputWeight = lazy(() => import('./InputWeight'))
const InputCallories = lazy(() => import('./InputCallories'))
const FormButtons = lazy(() => import('./FormButtons'))

type ReceivedData = { data: number; timestamp: number }

export default function Form() {
  const name = auth.currentUser?.displayName

  console.log(auth.currentUser)

  const { register, handleSubmit, reset, setValue, getFieldState } =
    useForm<InForm>({
      defaultValues: {
        name,
        startWeight: '',
        targetWeight: '',
        maxCallories: '',
      },
    })

  useEffect(() => {
    const get = async () => {
      const startWeight = (await getLast('startWeight')) as ReceivedData
      const targetWeight = (await getLast('targetWeight')) as ReceivedData
      const maxCallories = (await getLast('maxCallories')) as ReceivedData
      reset({
        startWeight:
          startWeight !== undefined ? startWeight.data.toString() : '',
        targetWeight:
          targetWeight !== undefined ? targetWeight.data.toString() : '',
        maxCallories:
          maxCallories !== undefined ? maxCallories.data.toString() : '',
      })
    }
    get()
  }, [reset])

  const onSubmit: SubmitHandler<InForm> = async data => {
    if (getFieldState('name').isDirty)
      await updateProfile(auth.currentUser as User, {
        displayName: data.name,
      })
    if (getFieldState('startWeight').isDirty)
      await setLast(Number(data.startWeight), 'startWeight')
    if (getFieldState('targetWeight').isDirty)
      await setLast(Number(data.targetWeight), 'targetWeight')
    if (getFieldState('maxCallories').isDirty)
      await setLast(Number(data.maxCallories), 'maxCallories')

    reset(data)

    successToast('Сохранено!')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputString
        settingsKey={settings.name}
        register={register(settings.name)}
      />

      <InputWeight
        settingsKey={settings.startWeight}
        register={register(settings.startWeight)}
        setValue={setValue}
      />

      <InputWeight
        settingsKey={settings.targetWeight}
        register={register(settings.targetWeight)}
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
