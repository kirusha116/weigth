import { lazy, Suspense } from 'react'

const Header = lazy(() => import('@/components/Settings/Header'))
const Form = lazy(() => import('@/components/Settings/Form'))
const Bottom = lazy(() => import('@/components/Settings/Bottom'))

export default function Settings() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <Suspense>
        <Form />
      </Suspense>
      <Suspense>
        <Bottom />
      </Suspense>
    </>
  )
}
