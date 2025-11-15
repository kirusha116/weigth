import { settings } from '@/constants/settings'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { handleSave, initialState } from '@/store/store'
import { lazy, useEffect } from 'react'
import { onFormSubmit } from '@/utils/onFormSubmit'
import type { InForm } from '@/types/Storage'
import { auth } from '@/firebase'
import { updateProfile, type User } from 'firebase/auth'
import successToast from '@/utils/successToast'
import { localeName } from '@/store/localKeys'

const InputString = lazy(() => import('./InputString'))
const InputWeight = lazy(() => import('./InputWeight'))
const InputCallories = lazy(() => import('./InputCallories'))
const FormButtons = lazy(() => import('./FormButtons'))

export default function Form() {
  const dispatch = useAppDispatch()

  const name = auth.currentUser?.displayName || localStorage.getItem(localeName)

  const { startWeight, targetWeight, maxCallories, startWeightDate } =
    useGetStorage()

  const { register, handleSubmit, reset, setValue } = useForm<InForm>({
    defaultValues: {
      name,
      startWeight: startWeight?.toString(),
      targetWeight: targetWeight?.toString(),
      maxCallories: maxCallories?.toString(),
    },
  })

  const onSubmit: SubmitHandler<InForm> = async data => {
    if (auth.currentUser) {
      if (auth.currentUser?.displayName !== data.name) {
        await updateProfile(auth.currentUser as User, {
          displayName: data.name,
        })
      }
    } else {
      if (localStorage.getItem(localeName) !== data.name) {
        localStorage.setItem(localeName, data.name as string)
      }
    }
    const withOutName = Object.fromEntries(
      Object.entries(data).filter(elem => {
        return elem[0] !== 'name'
      }),
    )

    dispatch(
      handleSave(
        onFormSubmit(
          withOutName as Omit<InForm, 'name'>,
          startWeightDate as string,
        ),
      ),
    )
    successToast('Сохранено!')
  }

  useEffect(() => {
    dispatch(initialState())
  }, [dispatch])

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
