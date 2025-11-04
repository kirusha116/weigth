import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'

const Header = lazy(() => import('@/components/Layout/Header'))
const Navigation = lazy(() => import('@/components/Layout/Navigation'))

export default function Layout() {
  const isMobile = !useMediaQuery('(min-width: 640px)')

  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main className="lg:container xl:max-w-7xl p-5 m-auto flex">
        <Suspense>
          <Navigation />
        </Suspense>
        <section className={`ml-4 xl:mr-47 grow ${isMobile ? 'mb-21 !ml-0' : ''}`}>
          <Outlet />
        </section>
      </main>
    </>
  )
}
