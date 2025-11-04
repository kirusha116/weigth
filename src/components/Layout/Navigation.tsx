import { useMediaQuery } from 'usehooks-ts'
import {
  menu,
  menuIcons,
  menuLabels,
  mobileMenu,
  mobileMenuIcons,
} from '@/constants/menu'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  const isMobile = !useMediaQuery('(min-width: 640px)')
  const isPad = !useMediaQuery('(min-width: 1024px)')
  return (
    <>
      {!isMobile && (
        <nav className="mt-4 z-50">
          {Object.values(menu).map(key => {
            return (
              <NavLink
                key={key}
                to={`/${key !== 'dashboard' ? key : ''}`}
                className={({ isActive }) =>
                  isActive
                    ? `flex p-3 ${
                        !isPad && 'pr-15'
                      } bg-rose-50 rounded-md *:stroke-rose-400 xl:w-auto w-fit`
                    : `flex p-3 ${!isPad && 'pr-15'} rounded-md xl:w-auto w-fit`
                }
              >
                {menuIcons[key]}
                {!isPad && <p className="ml-3">{menuLabels[key]}</p>}
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
    </>
  )
}
