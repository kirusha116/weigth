
import Header from '@/components/Layout/Header'
import Navigation from '@/components/Layout/Navigation'
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'


export default function Layout() {
  const isMobile = !useMediaQuery('(min-width: 640px)')

  return (
    <>
      <Header />
      <main className="lg:container xl:max-w-7xl p-5 m-auto flex">
        <Navigation />
        <section className={`ml-4 xl:mr-47 grow ${isMobile ? 'mb-21' : ''}`}>
          <Outlet />
        </section>
      </main>
    </>
  )
}
