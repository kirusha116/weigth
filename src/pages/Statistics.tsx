import Header from '@/components/Statistics/Header'
import { auth, db } from '@/firebase'
import type { Storage } from '@/types/Storage'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { ArrowBigDown, ArrowBigUp, Minus } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Statistics() {
  const [history, setHistory] = useState<Storage[]>()

  useEffect(() => {
    async function loadHistory() {
      const history: Storage[] = []
      const q = query(
        collection(db, auth.currentUser?.uid as string),
        where('timestamp', '!=', 'undefined'),
        orderBy('timestamp'),
      )
      const querySnapShot = await getDocs(q)
      querySnapShot.forEach(elem =>
        history.push(elem.data() as unknown as Storage),
      )
      setHistory(history)
    }
    loadHistory()
  })
  return (
    <>
      <Header />
      <ul className="flex flex-col-reverse">
        {history?.map((elem, index, arr) => {
          const arrow = (index => {
            if (!index || elem.currentWeight === arr[index - 1].currentWeight)
              return () => <Minus className="stroke-gray-400 fill-gray-400 " />
            if (
              (elem.currentWeight as number) >
              (arr[index - 1].currentWeight as number)
            )
              return () => (
                <ArrowBigUp className="stroke-red-300 fill-red-300" />
              )
            return () => (
              <ArrowBigDown className="stroke-green-300 fill-green-300" />
            )
          })(index)
          return (
            <li
              key={elem.lastDateOfLoad}
              className={
                'flex mb-1 items-center rounded-lg bg-white border shadow-xs px-3 py-2 relative w-full'
              }
            >
              <div className="h-8 rounded-md aspect-square border-rose-300 border-2 mr-4 flex justify-center items-center">
                {arrow()}
              </div>
              <p>
                <b>
                  {new Date(elem.lastDateOfLoad).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </b>
              </p>
              <div className="grow"></div>
              <p>
                <b>{`${elem.currentWeight?.toString()}${
                  !((elem.currentWeight as number) % 1) ? '.0' : ''
                } кг`}</b>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}
