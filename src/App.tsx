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
import { toast } from 'sonner'
import { Toaster } from './components/ui/sonner'
import { CheckCheck } from 'lucide-react'

export default function App() {
  if (!localStorage.getItem(localKey)) {
    saveStorage({ balance: 0, currentCallories: 0 })
  }
  const [storage, setStorage] = useState<Partial<Storage>>({
    ...getStorage(),
  })
  const onSave = (newStorage: Partial<Storage>) => {
    toast.success('Сохранено', {
      classNames: {
        toast:
          'flex justify-center !w-38 relative left-[50%] translate-x-[-50%] ',
        title: 'text-base ml-2 text-nowrap',
      },
    })
    setStorage({ ...storage, ...newStorage })
    saveStorage({ ...storage, ...newStorage })
  }
  return (
    <>
      <Toaster
        richColors
        icons={{ success: <CheckCheck /> }}
        position="top-center"
      />
      <BrowserRouter>
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
            <Route path="/tasks" element={<Tasks />}></Route>
            <Route path="/awards" element={<Awards />}></Route>
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
