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
import type { Variant } from './BlockMainContent'

export default function BlockDialog({
  variant,
  dialogTriggerText,
  dialogHeader,
  defaultValue,
  onSave,
}: {
  variant: Variant
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
        {variant === 'weigth' && (
          <Input
            className="mb-3"
            onPaste={e => e.preventDefault()}
            value={inputValue}
            onInput={e => {
              const input = e.target as HTMLInputElement
              let val = input.value.replace(/[^0-9.,]/g, '')
              val = val.replace(',', '.')
              const parts = val.split('.')
              if (parts.length > 2)
                val = parts[0] + '.' + parts.slice(1).join('')
              if (Number(val) % 1)
                val = (Math.floor(Number(val) * 10) / 10).toString()
              setInputValue(val)
            }}
          />
        )}
        {variant === 'callories' && (
          <Input
            className="mb-3"
            value={inputValue}
            onPaste={e => e.preventDefault()}
            onInput={e => {
              const input = e.target as HTMLInputElement
              const val = input.value.replace(/[^0-9]/g, '')
              setInputValue(val)
            }}
          />
        )}
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
