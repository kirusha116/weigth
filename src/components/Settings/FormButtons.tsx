import { Button } from '@/components/ui/button'
import type { UseFormReset } from 'react-hook-form'
import type { Settings } from '@/constants/settings'

export default function FormButtons({
  reset,
}: {
  reset: UseFormReset<Settings>
}) {
  return (
    <div className="flex mt-4 justify-end">
      <Button variant={'outline'} className="ml-auto mr-4" type="submit">
        Сохранить
      </Button>
      <Button variant="rose" onClick={() => reset()}>
        Cбросить
      </Button>
    </div>
  )
}
