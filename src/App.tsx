import { CheckCheck, Frown } from 'lucide-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from './components/ui/sonner'
import { store } from './store/store'
import { lazy, Suspense } from 'react'
import { Heart } from './components/Heart.js'
import './firebase.js'

const Layout = lazy(() => import('./pages/Layout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Tasks = lazy(() => import('./pages/Tasks'))
const Awards = lazy(() => import('./pages/Awards'))
const Statistics = lazy(() => import('./pages/Statistics'))
const Settings = lazy(() => import('./pages/Settings'))

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster
          richColors
          expand
          icons={{ success: <CheckCheck />, warning: <Frown /> }}
          theme="light"
          position="top-center"
        />
        <BrowserRouter basename="/weigth">
          <Suspense fallback={<Heart />}>
            <Routes>
              <Route path="" element={<Layout />}>
                <Route index element={<Dashboard />}></Route>
                <Route path="tasks" element={<Tasks />}></Route>
                <Route path="awards" element={<Awards />}></Route>
                <Route path="statistics" element={<Statistics />}></Route>
                <Route path="settings" element={<Settings />}></Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
