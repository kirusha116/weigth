import { removeStorage } from '@/utils/workWithStorage'
import { getAuth, signOut } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'


export default function Bottom() {
  const navigate = useNavigate()
  return (
    <>
      <Button
        className="block mt-4 ml-auto mr-0 bg-black text-white"
        onClick={() => {
          const auth = getAuth()
          signOut(auth)
            .then(() => {
              removeStorage()
              navigate('/')
              location.reload()
            })
            .catch(error => {
              console.log(error.code)
            })
        }}
      >
        Выйти из профиля
      </Button>
      <Button
        className="block mt-4 ml-auto mr-0 bg-black text-white"
        onClick={() => {
          removeStorage()
          navigate('/')
          location.reload()
        }}
      >
        Очистить память
      </Button>
    </>
  )
}
