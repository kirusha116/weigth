import type { JSX } from 'react'

export function Block({ children }: { children: JSX.Element }) {
  return (
    <>
      <div className="w-full rounded-xl p-2 border-2 bg-white">{children}</div>
    </>
  )
}
