import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { useForm, type SubmitHandler } from 'react-hook-form'
import '@/firebase.js'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { Label } from '../ui/label.js'
import { Button } from '../ui/button.js'
import { useState } from 'react'
import { Heart } from '../Heart.js'
import warningToast from '@/utils/warningToast.js'
import successToast from '@/utils/successToast.js'

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
  const [isHeartOpen, setIsHeartOpen] = useState<boolean>(false)

  const onFulfilled = () => {
    onOpenChange(false)
    setIsHeartOpen(false)
    successToast('Успешно!')
  }

  const onSubmit: SubmitHandler<Data> = ({ email, password }: Data) => {
    setIsHeartOpen(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(onFulfilled)
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-credential':
            createUserWithEmailAndPassword(auth, email, password)
              .then(onFulfilled)
              .catch(error => {
                setIsHeartOpen(false)
                warningToast(error.code)
              })
            break
          case 'auth/weak-password':
            setIsHeartOpen(false)
            warningToast('Неверный пароль')
            break
          case 'auth/invalid-email':
            setIsHeartOpen(false)
            warningToast('Неверный email')
            break
          default:
            setIsHeartOpen(false)
            warningToast(error.code)
            break
        }
      })
  }

  const { register, handleSubmit } = useForm<Data>()

  return (
    <>
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
              <Button
                variant="outline"
                onClick={e => {
                  e.preventDefault()
                  onOpenChange(false)
                }}
              >
                Отмена
              </Button>
              <Button type="submit" variant="rose">
                Войти
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {isHeartOpen && <Heart />}
    </>
  )
}
