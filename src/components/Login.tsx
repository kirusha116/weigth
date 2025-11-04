import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { useForm, type SubmitHandler } from 'react-hook-form'
import '../firebase.js'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { toast } from 'sonner'
import { Label } from './ui/label.js'

type Data = {
  email: string
  password: string
}

export default function Login({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const auth = getAuth()
  const onSubmit: SubmitHandler<Data> = ({ email, password }: Data) =>
    signInWithEmailAndPassword(auth, email, password)
      .then()
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-credential':
            createUserWithEmailAndPassword(auth, email, password).then().catch()
            break
          case 'auth/weak-password':
            toast.warning(`Неверный пароль`, {
              classNames: {
                toast:
                  'flex justify-center !w-fit relative left-[50%] translate-x-[-50%] ',
                title: 'text-base ml-2 text-nowrap',
              },
            })
            break
        }
      })

  const { register, handleSubmit } = useForm<Data>()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="mb-7">
            <DialogTitle>Вход по почте</DialogTitle>
          </DialogHeader>
          <Label className="mb-2">Адрес электронной почты</Label>
          <Input {...register('email')} className="mb-5" />
          <Label className="mb-2">Пароль</Label>
          <Input {...register('password')} className="mb-5" />
          <DialogFooter>
            <DialogClose>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Отмена
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="rose"
              onClick={() => onOpenChange(false)}
            >
              Войти
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
