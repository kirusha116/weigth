import { menu, menuIcons, menuLabels } from '@/constants/menu'
import { useGetStorage } from '@/hooks/storageHooks'
import { Star } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  const balance = useGetStorage().balance
  return (
    <>
      <header className="container xl:max-w-7xl p-5 m-auto flex justify-between items-center">
        <NavLink
          to={'/'}
          className="size-12 leading-12 text-center bg-rose-300 text-2xl text-white rounded-xl"
        >
          <b>KS</b>
        </NavLink>
        <NavLink to={'/'} className="flex flex-col justify-center">
          <h1 className="ml-3 text-xl">
            <b>KlyuSEX</b>
          </h1>
          <h2 className="ml-3 text-md text-gray-700">Похудение с мотивацией</h2>
        </NavLink>
        <div className="grow"></div>
        <p className="flex text-lg">{`Баланс: ${balance}`}</p>
        <Star className="ml-1 size-5 stroke-rose-300 fill-rose-300" />
      </header>
      <main className="container xl:max-w-7xl px-5 m-auto flex">
        <nav className="mt-4">
          {Object.values(menu).map(key => {
            return (
              <NavLink
                key={key}
                to={`/${key !== 'dashboard' ? key : ''}`}
                className={({ isActive }) =>
                  isActive
                    ? 'flex p-3 pr-15 bg-rose-50 rounded-md *:stroke-rose-400'
                    : 'flex p-3 pr-15 rounded-md'
                }
              >
                {menuIcons[key]}
                <p className="ml-3">{menuLabels[key]}</p>
              </NavLink>
            )
          })}
        </nav>
        <section className="px-8 xl:mr-47 grow">
          <Outlet />
        </section>
      </main>
    </>
  )
}
