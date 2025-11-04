import { settings, settingsLabels } from '@/constants/settings'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useAppDispatch, useGetStorage } from '@/hooks/storageHooks'
import { getDate } from '@/utils/getDate'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { handleSave } from '@/store/store'
import type { Storage } from '@/types/Storage'
import { Button } from '@/components/ui/button'

export default function Form() {
  const { name, startWeigth, targetWeigth, maxCallories, startWeigthDate } =
    useGetStorage()
  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset, setValue } = useForm<{
    [key in keyof Storage]: string
  }>({
    defaultValues: {
      name,
      startWeigth: startWeigth?.toString(),
      targetWeigth: targetWeigth?.toString(),
      maxCallories: maxCallories?.toString(),
    },
  })
  const onSubmit: SubmitHandler<{ [key in keyof Storage]: string }> = data => {
    const storage: Partial<Storage> = {}
    if (data.name) storage.name = data.name
    if (data.startWeigth) storage.startWeigth = Number(data.startWeigth)
    if (data.targetWeigth) storage.targetWeigth = Number(data.targetWeigth)
    if (data.maxCallories) storage.maxCallories = Number(data.maxCallories)

    if (!startWeigthDate && storage.startWeigth) {
      storage.startWeigthDate = getDate()
      storage.currentWeigthDate = storage.startWeigthDate
      storage.currentWeigth = storage.startWeigth
    }
    dispatch(handleSave(storage))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.values(settings).map(key => {
        return (
          <div key={key}>
            <label className="text-md">{settingsLabels[key]}</label>
            {key === 'name' ? (
              <Input
                className="bg-white mt-2 mb-4"
                {...register(key)}
                enterKeyHint="done"
              />
            ) : key === 'maxCallories' ? (
              <Input
                className="bg-white mt-2 mb-4"
                {...register(key)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                enterKeyHint="done"
                onPaste={e => e.preventDefault()}
                onInput={e => {
                  const input = e.target as HTMLInputElement
                  const val = input.value.replace(/[^0-9]/g, '')
                  setValue(key, val, { shouldValidate: true })
                }}
              />
            ) : (
              <Input
                className="bg-white mt-2 mb-4"
                {...register(key)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                enterKeyHint="done"
                onPaste={e => e.preventDefault()}
                onInput={e => {
                  const input = e.target as HTMLInputElement
                  let val = input.value.replace(/[^0-9.,]/g, '')
                  val = val.replace(',', '.')
                  const parts = val.split('.')
                  if (parts.length > 2)
                    val = parts[0] + '.' + parts.slice(1).join('')
                  if (Number(val) % 1)
                    val = (Math.floor(Number(val) * 10) / 10).toString()
                  setValue(key, val, { shouldValidate: true })
                }}
              />
            )}
          </div>
        )
      })}
      <div className="flex mt-4 justify-end">
        <Button
          variant={'outline'}
          className="ml-auto mr-4"
          type="submit"
          onClick={() =>
            toast.success('Сохранено', {
              classNames: {
                toast:
                  'flex justify-center !w-fit relative left-[50%] translate-x-[-50%] ',
                title: 'text-base ml-2 text-nowrap',
              },
            })
          }
        >
          Сохранить
        </Button>
        <Button
          variant="rose"
          onClick={() => {
            reset()
          }}
        >
          Cбросить
        </Button>
      </div>
    </form>
  )
}
