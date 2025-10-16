import {
  menu,
  menuIcons,
  menuLabels,
  mobileMenu,
  mobileMenuIcons,
} from '@/constants/menu'
import { useGetStorage } from '@/hooks/storageHooks'
import { Star } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'

export default function Layout() {
  const balance = useGetStorage().balance
  const isMobile = !useMediaQuery('(min-width: 1024px)')
  return (
    <>
      <header className="container xl:max-w-7xl p-5 m-auto flex justify-between items-center">
        <NavLink
          to={'/'}
          className="size-12 leading-12 text-center bg-rose-300 text-2xl text-white rounded-xl"
        >
          <b>KS</b>
        </NavLink>
        <NavLink to={'/'} className="flex flex-col justify-center w-fit">
          <h1 className="ml-3 text-xl">
            <b>KlyuSEX</b>
          </h1>
          <h2 className="ml-3 text-md text-gray-700">Похудение с мотивацией</h2>
        </NavLink>
        <div className="grow"></div>
        <p className="flex text-xl">{balance}</p>
        <Star className="ml-1 size-6 stroke-rose-300 fill-rose-300" />
      </header>
      <main className="container xl:max-w-7xl px-5 m-auto flex">
        {!isMobile && (
          <nav className="mt-4 z-50">
            {Object.values(menu).map(key => {
              return (
                <NavLink
                  key={key}
                  to={`/${key !== 'dashboard' ? key : ''}`}
                  className={({ isActive }) =>
                    isActive
                      ? 'flex p-3 pr-15 bg-rose-50 rounded-md *:stroke-rose-400 xl:w-auto w-fit'
                      : 'flex p-3 pr-15 rounded-md xl:w-auto w-fit'
                  }
                >
                  {menuIcons[key]}
                  <p className="ml-3">{menuLabels[key]}</p>
                </NavLink>
              )
            })}
          </nav>
        )}
        {isMobile && (
          <nav className="fixed left-0 top-full -translate-y-full flex w-full justify-around pt-3 pb-8 items-end bg-white border-t z-50">
            {Object.values(mobileMenu).map(key => {
              return (
                <NavLink
                  key={key}
                  to={`/${key !== 'dashboard' ? key : ''}`}
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-rose-50 rounded-md *:stroke-rose-400'
                      : 'rounded-md'
                  }
                >
                  {mobileMenuIcons[key]}
                </NavLink>
              )
            })}
          </nav>
        )}
        <section className={`md:ml-4 xl:mr-47 grow ${isMobile ? 'mb-21' : ''}`}>
          <Outlet />
        </section>
      </main>
    </>
  )
}
