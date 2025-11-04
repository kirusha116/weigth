import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

type VariantProps = {
  weigth: string
  callories: string
}

export default function BlockNoData({
  variant,
  startWeigth,
  targetWeigth,
}: {
  variant: keyof VariantProps
  startWeigth?: boolean
  targetWeigth?: boolean
}) {
  const navigate = useNavigate()
  const variantProps: VariantProps = {
    weigth: `
        ${startWeigth ? 'начальный вес' : ''} 
        ${startWeigth && targetWeigth ? 'и' : ''} 
        ${targetWeigth ? 'цель' : ''}
    `,
    callories: 'допустимое количество калорий в день',
  }
  return (
    <>
      <p className="text-center">{`Для отображения данного блока необходимо указать ${variantProps[variant]}`}</p>
      <Button
        variant="rose"
        className="block ml-auto mr-0 mt-4 leading-4"
        onClick={() => navigate('/settings')}
      >
        Указать
      </Button>
    </>
  )
}
