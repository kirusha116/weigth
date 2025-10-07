import { Button } from '../ui/button'
import { CalendarDays } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { useState } from 'react'

export default function BlockDialog({
  dialogTriggerText,
  dialogHeader,
  defaultValue,
  onSave,
}: {
  dialogTriggerText: string
  dialogHeader: string
  defaultValue: string
  onSave: (newValue: number) => void
}) {
  const [inputValue, setInputValue] = useState<string>()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="rose"
          className="block text-base leading-4 mb-4 mx-auto w-9/10"
        >
          {dialogTriggerText}
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="w-auto px-5 py-4"
        onCloseAutoFocus={() => setInputValue(defaultValue)}
      >
        <DialogHeader>
          <DialogTitle className="m-auto mb-2 text-2xl">
            {dialogHeader}
          </DialogTitle>
          <DialogDescription className="text-sm flex items-center mb-3">
            <CalendarDays className="inline-block mx-2 size-4.5" />
            <span>
              {`Сегодня - 
                    ${new Date().toLocaleString('ru', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}`}
            </span>
          </DialogDescription>
        </DialogHeader>
        <Input
          className="mb-3"
          defaultValue={inputValue}
          onChange={e => {
            setInputValue(e.target.value)
          }}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => {
                if (inputValue) {
                  onSave(Number(inputValue))
                }
              }}
            >
              Сохранить
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="rose">Отмена</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
