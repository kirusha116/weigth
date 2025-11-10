import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Heart } from './components/Heart'
import { Provider } from 'react-redux'
import { store } from './store/store'

const App = lazy(() => import('./App'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Heart />}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>,
)
