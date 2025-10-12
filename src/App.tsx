import { CheckCheck, Frown } from 'lucide-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { Provider } from 'react-redux'
import { Toaster } from './components/ui/sonner'
import Dashboard from './components/Dashboard/Dasboard'
import Tasks from './components/Tasks'
import { store } from './store/store'
import Awards from './components/Awards'
import Statistics from './components/Statistics'
import Settings from './components/Settings'

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster
          richColors
          expand
          icons={{ success: <CheckCheck />, warning: <Frown /> }}
          position="top-center"
        />
        <BrowserRouter basename="/weigth">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />}></Route>
              <Route path="/tasks" element={<Tasks />}></Route>
              <Route path="/awards" element={<Awards />}></Route>
              <Route path="/statistics" element={<Statistics />}></Route>
              <Route path="/settings" element={<Settings />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
