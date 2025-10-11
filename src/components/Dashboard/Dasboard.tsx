import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useGetStorage } from '@/hooks/storageHooks'
import { Grid } from './Grid'

export default function Dashboard() {
  const navigate = useNavigate()
  const name = useGetStorage().name
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
      <Grid />
    </>
  )
}
