import { Heart } from '@/components/Heart'
import { lazy, Suspense } from 'react'

const Header = lazy(() => import('@/components/Tasks/Header'))
const InnerTasks = lazy(() => import('@/components/Tasks/Tasks'))

export default function Tasks() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <Suspense fallback={<Heart />}>
        <InnerTasks />
      </Suspense>
    </>
  )
}
