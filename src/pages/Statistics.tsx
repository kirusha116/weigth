import Header from '@/components/Statistics/Header'
import { auth, db } from '@/firebase'
import type { Storage } from '@/types/Storage'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
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
        {history?.map(elem => {
          return (
            <li
              key={elem.lastDateOfLoad}
              className={
                'flex mb-1 items-center rounded-lg bg-white border shadow-xs px-3 py-2 relative w-full'
              }
            >
              <div className="h-9 rounded-md aspect-square bg-rose-300 mr-4 flex justify-center items-center">
                {}
              </div>
              <p>
                <b>{elem.lastDateOfLoad}</b>
              </p>
              <div className="grow"></div>
              <p>
                <b>{elem.currentWeight + ' кг'}</b>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}
