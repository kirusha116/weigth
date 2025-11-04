import { Button } from '@/components/ui/button'
import type { UseFormReset } from 'react-hook-form'
import type { Settings } from '@/constants/settings'
import successToast from '@/utils/successToast'

export default function FormButtons({
  reset,
}: {
  reset: UseFormReset<Settings>
}) {
  const onSave = () => successToast('Сохранено')

  return (
    <div className="flex mt-4 justify-end">
      <Button
        variant={'outline'}
        className="ml-auto mr-4"
        type="submit"
        onClick={onSave}
      >
        Сохранить
      </Button>
      <Button variant="rose" onClick={() => reset()}>
        Cбросить
      </Button>
    </div>
  )
}
