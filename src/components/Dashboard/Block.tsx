import type { JSX } from 'react'

export function Block({ children }: { children: JSX.Element }) {
  return (
    <>
      <div className="w-full p-1 bg-white">
          <div className="w-full rounded-xl p-4 border-2 bg-white ">
            {children}
          </div>
      </div>
    </>
  )
}
