import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import type { Storage } from '@/utils/workWithStorage'
import { Grid } from './Grid'

export default function Dashboard({
  name,
  currentWeigth,
  currentWeigthDate,
  startWeigth,
  targetWeigth,
  currentCallories,
  currentCalloriesDate,
  maxCallories,
  balance,
  onSave,
  tasksDay,
  completedTasks,
  awardsDay,
  completedAwards,
}: {
  name?: string
  currentWeigth?: number
  currentWeigthDate?: string
  startWeigth?: number
  targetWeigth?: number
  currentCallories?: number
  currentCalloriesDate?: string
  maxCallories?: number
  balance?: number
  onSave: (newValuesObject: Partial<Storage>) => void
  tasksDay?: number[]
  completedTasks?: number[]
  awardsDay?: number[]
  completedAwards?: number[]
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
        currentWeigthDate={currentWeigthDate}
        startWeigth={startWeigth}
        targetWeigth={targetWeigth}
        currentCallories={currentCallories}
        currentCalloriesDate={currentCalloriesDate}
        maxCallories={maxCallories}
        balance={balance as number}
        onSave={onSave}
        tasksDay={tasksDay as number[]}
        completedTasks={completedTasks as number[]}
        awardsDay={awardsDay as number[]}
        completedAwards={completedAwards as number[]}
      />
    </>
  )
}
