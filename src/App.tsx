import './firebase.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { lazy, useEffect, useState, type JSX } from 'react'
import { useAppDispatch } from './hooks/storeHooks.js'
import { Heart } from './components/Heart.js'
import { auth } from './firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import type { ToasterProps } from 'sonner'
import { DynamicIcon } from 'lucide-react/dynamic'
const Layout = lazy(() => import('./pages/Layout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Tasks = lazy(() => import('./pages/Tasks'))
const Awards = lazy(() => import('./pages/Awards'))
const Statistics = lazy(() => import('./pages/Statistics'))
const Settings = lazy(() => import('./pages/Settings'))
const Login = lazy(() => import('./components/Login.js'))

function App() {
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [isLoginVisible, setIsLoginVisible] = useState<boolean>(false)
  const [Toaster, setToaster] = useState<
    (({ ...props }: ToasterProps) => JSX.Element) | null
  >(null)
  const [CheckCheck, setCheckCheck] = useState<React.FC | null>(null)
  const [Frown, setFrown] = useState<React.FC | null>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setIsLoginVisible(!auth.currentUser)
      if (auth.currentUser) {
        const load = async () => {
          const { getTasks } = await import('./store/tasksSlice.js')
          await dispatch(getTasks())
          setIsDownloaded(true)
        }
        load()
      }
      async function getToaster() {
        const { Toaster } = await import('./components/ui/sonner')
        setToaster(() => Toaster)
        setCheckCheck(() => () => <DynamicIcon name={'check-check'} />)
        setFrown(() => () => <DynamicIcon name={'frown'} />)
      }
      getToaster()
    })
    return unsubscribe
  }, [dispatch])

  return (
    <>
      {Toaster && CheckCheck && Frown && (
        <Toaster
          mobileOffset={{ left: '50%' }}
          richColors
          icons={{ success: <CheckCheck />, warning: <Frown /> }}
          theme="light"
          position="top-center"
        />
      )}
      {isDownloaded ? (
        <BrowserRouter basename="/weight">
          <Routes>
            <Route path="" element={<Layout />}>
              <Route index element={<Dashboard />}></Route>
              <Route path="tasks" element={<Tasks />}></Route>
              <Route path="awards" element={<Awards />}></Route>
              <Route path="statistics" element={<Statistics />}></Route>
              <Route path="settings" element={<Settings />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <Heart />
      )}
      {isLoginVisible && <Login />}
    </>
  )
}

export default App
