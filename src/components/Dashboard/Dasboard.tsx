import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import type { Storage } from '@/utils/workWithStorage'
import { Grid } from './Grid'

export default function Dashboard({
  name,
  currentWeigth,
  startWeigth,
  targetWeigth,
  currentCallories,
  maxCallories,
  onSave,
}: {
  name?: string
  currentWeigth?: number
  startWeigth?: number
  targetWeigth?: number
  currentCallories?: number
  maxCallories?: number
  onSave: (newValuesObject: Partial<Storage>) => void
}) {
  const navigate = useNavigate()
  return (
    <>
      <h1 className="text-2xl leading-6 inline-block">
        {name ? (
          <b>{`Привет, ${name}!`}</b>
        ) : (
          <>
            <b className="mr-2 leading-9">{`Привет!`}</b>
            <Button
              variant="rose"
              className="text-base leading-4"
              onClick={() => navigate('/settings')}
            >
              Указать имя
            </Button>
          </>
        )}
      </h1>
      <h2 className="text-md text-gray-700 mb-6">
        Держись! Каждый маленький шаг - это прогресс!
      </h2>
      <Grid
        currentWeigth={currentWeigth}
        startWeigth={startWeigth}
        targetWeigth={targetWeigth}
        currentCallories={currentCallories}
        maxCallories={maxCallories}
        onSave={onSave}
      />
    </>
  )
}
