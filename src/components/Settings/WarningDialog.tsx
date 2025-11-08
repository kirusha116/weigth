import { getAuth, signOut } from 'firebase/auth'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import warningToast from '@/utils/warningToast'
import { removeStorage } from '@/store/removeStorage'

type Variant = 'exit' | 'reset'

export default function WarningDialog({
  variant,
  isOpen,
  onOpenChange,
}: {
  variant: Variant
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const variantParams = {
    exit: {
      description: 'Так данные будут храниться только на телефоне!',
      buttonText: 'Выйти',
      onButtonClick: () => {
        const auth = getAuth()
        signOut(auth)
          .then(() => {
            warningToast('Вы вышли из аккаунта')
            onOpenChange(false)
          })
          .catch(error => {
            warningToast(error.code)
            onOpenChange(false)
          })
      },
    },
    reset: {
      description: 'Все данные будут удалены! Придется начать сначала!',
      buttonText: 'Удалить',
      onButtonClick: () => {
        removeStorage()
        setTimeout(() => {
          location.assign('/')
        }, 400)
      },
    },
  }
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
          <DialogHeader className="mb-7">
            <DialogTitle>Точно? Точно?</DialogTitle>
            <DialogDescription>
              {variantParams[variant].description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Отмена
              </Button>
            </DialogClose>
            <Button
              variant="rose"
              onClick={() => {
                const auth = getAuth()
                signOut(auth).then(() => {
                  variantParams[variant].onButtonClick()
                })
              }}
            >
              {variantParams[variant].buttonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
