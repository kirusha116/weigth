import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { memo } from 'react'

type VariantProps = {
  weight: string
  callories: string
}

function BlockNoData({
  variant,
  startWeight,
  targetWeight,
}: {
  variant: keyof VariantProps
  startWeight?: boolean
  targetWeight?: boolean
}) {
  const navigate = useNavigate()
  const variantProps: VariantProps = {
    weight: `
        ${startWeight ? 'начальный вес' : ''} 
        ${startWeight && targetWeight ? 'и' : ''} 
        ${targetWeight ? 'цель' : ''}
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

export default memo(BlockNoData)
