import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

type Variant = 'exit' | 'reset' | 'delete'

export default function WarningDialog({
  variant,
  isOpen,
  onOpenChange,
}: {
  variant: Variant
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const initGetParams = async (variant: Variant) => {
    switch (variant) {
      case 'exit': {
        return (await import('@/constants/warningExit')).getParams
      }
      case 'reset': {
        return (await import('@/constants/warningReset')).getParams
      }
      case 'delete': {
        return (await import('@/constants/warningDelete')).getParams
      }
    }
  }
  const [params, setParams] = useState({
    title: '',
    description: '',
    firstBtnText: '',
    firstBtnClick: () => {},
    secondBtnText: '',
    secondBtnClick: () => {},
  })
  useEffect(() => {
    ;(async () => {
      await initGetParams(variant).then(getParams =>
        setParams(getParams(onOpenChange)),
      )
    })()
  }, [onOpenChange, variant])

  return (
    <>
      {params && (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
            <DialogHeader className="mb-7">
              <DialogTitle>{params.title}</DialogTitle>
              <DialogDescription>{params.description}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={params.firstBtnClick}>
                {params.firstBtnText}
              </Button>
              <Button
                variant="rose"
                onClick={() => {
                  params.secondBtnClick()
                }}
              >
                {params.secondBtnText}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
