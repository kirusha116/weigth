import { Button } from './ui/button'
import { removeStorage, type Storage } from '@/utils/workWithStorage'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { settings, settingsLabels } from '@/constants/settings'
import { Input } from './ui/input'
import { getDate } from '@/utils/getDate'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Settings({
  name,
  startWeigth,
  targetWeigth,
  maxCallories,

  onSave,
}: {
  name?: string
  startWeigth?: number
  targetWeigth?: number
  maxCallories?: number
  onSave: (newStorage: Storage) => void
}) {
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm<Storage>({
    defaultValues: { name, startWeigth, targetWeigth, maxCallories },
  })
  const onSubmit: SubmitHandler<Storage> = data => {
    const storage: Storage = { ...data }
    if (!storage.startWeigthDate && storage.startWeigth) {
      storage.startWeigthDate = getDate()
      storage.currentWeigthDate = storage.startWeigthDate
      storage.currentWeigth = storage.startWeigth
    }
    onSave(storage)
  }

  return (
    <>
      <h1 className="text-2xl mb-6">
        <b>Настройки</b>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.values(settings).map(key => {
          return (
            <div key={key}>
              <label className="text-md">{settingsLabels[key]}</label>
              <Input className="bg-white mt-2 mb-4" {...register(key)} />
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
      <Button
        className="block mt-4 ml-auto mr-0 bg-black text-white"
        onClick={() => {
          removeStorage()
          navigate('/')
          location.reload()
        }}
      >
        Очистить память
      </Button>
    </>
  )
}
