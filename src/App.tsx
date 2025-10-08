import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard/Dasboard'
import Tasks from './components/Tasks'
import Awards from './components/Awards'
import Statistics from './components/Statistics'
import Settings from './components/Settings'
import {
  getStorage,
  localKey,
  saveStorage,
  type Storage,
} from './utils/workWithStorage'
import { useState } from 'react'
import { Toaster } from './components/ui/sonner'
import { CheckCheck, Frown } from 'lucide-react'
import { getDate } from './utils/getDate'
import { tasks } from './constants/tasks'
import { getRandomsId } from './utils/getRandomId'

export default function App() {
  if (!localStorage.getItem(localKey)) {
    saveStorage({
      balance: 0,
      currentCallories: 0,
      completedTasks: [],
      completedTasksDate: getDate(),
      completedAwards: [],
      completedAwardsDate: getDate(),
    })
  }
  const [storage, setStorage] = useState<Partial<Storage>>({
    // ...{ ...getStorage(), currentWeigthDate: '' },
    ...getStorage(),
  })
  const onSave = (newStorage: Partial<Storage>) => {
    setStorage({ ...storage, ...newStorage })
    saveStorage({ ...storage, ...newStorage })
    console.log(storage)
  }
  if (storage.completedAwardsDate !== getDate()) {
    onSave({ completedAwards: [], completedAwardsDate: getDate() })
  }
  if (storage.completedTasksDate !== getDate()) {
    onSave({ completedTasks: [], completedTasksDate: getDate() })
  }
  if (storage.tasksDayDate !== getDate()) {
    onSave({ tasksDay: getRandomsId(tasks, 3), tasksDayDate: getDate() })
  }
  if (storage.awardsDayDate !== getDate()) {
    onSave({ awardsDay: getRandomsId(tasks, 3), awardsDayDate: getDate() })
  }
  return (
    <>
      <Toaster
        richColors
        expand
        icons={{ success: <CheckCheck />, warning: <Frown /> }}
        position="top-center"
      />
      <BrowserRouter basename="/weigth">
        <Routes>
          <Route
            path="/"
            element={<Layout balance={storage.balance as number} />}
          >
            <Route index element={<Navigate to={'/dashboard'} />}></Route>
            <Route
              path="/dashboard"
              element={<Dashboard {...storage} onSave={onSave} />}
            ></Route>
            <Route
              path="/tasks"
              element={
                <Tasks
                  completedTasks={storage.completedTasks as number[]}
                  balance={storage.balance as number}
                  onSave={onSave}
                />
              }
            ></Route>
            <Route
              path="/awards"
              element={
                <Awards
                  completedAwards={storage.completedAwards as number[]}
                  balance={storage.balance as number}
                  onSave={onSave}
                />
              }
            ></Route>
            <Route path="/statistics" element={<Statistics />}></Route>
            <Route
              path="/settings"
              element={<Settings {...storage} onSave={onSave} />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
