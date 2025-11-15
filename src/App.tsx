import { CheckCheck, Frown } from 'lucide-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import { lazy, useState } from 'react'
import { useAppDispatch } from './hooks/storageHooks.js'
import { initialState } from './store/store.js'
import './firebase.js'
import { Heart } from './components/Heart.js'
import Login from './components/Login.js'
import { auth } from './firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
const Layout = lazy(() => import('./pages/Layout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Tasks = lazy(() => import('./pages/Tasks'))
const Awards = lazy(() => import('./pages/Awards'))
const Statistics = lazy(() => import('./pages/Statistics'))
const Settings = lazy(() => import('./pages/Settings'))

function App() {
  const [isDownloaded, setIsDownloaded] = useState(false)

  const [isLoginVisible, setIsLoginVisible] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  onAuthStateChanged(auth, () => {
    setIsLoginVisible(!auth.currentUser)
    if (auth.currentUser) {
      const load = async () => {
        await dispatch(initialState())
        setIsDownloaded(true)
      }
      load()
    }
  })

  return (
    <>
      <Toaster
        mobileOffset={{ left: '50%' }}
        richColors
        icons={{ success: <CheckCheck />, warning: <Frown /> }}
        theme="light"
        position="top-center"
      />
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
