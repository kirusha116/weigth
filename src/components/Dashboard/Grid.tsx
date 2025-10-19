import BlockWeigth from './BlockWeigth'
import BlockCallories from './BlockCallories'
import BlockTasks from './BlockTasks'
import BlockAwards from './BlockAwards'
import { useMediaQuery } from 'usehooks-ts'

export function Grid() {
  const isMobile = !useMediaQuery('(min-width: 640px)')
  return (
    <>
      {isMobile && (
        <div>
          <BlockWeigth />
          <BlockCallories />
          <BlockTasks />
          <BlockAwards />
        </div>
      )}
      {!isMobile && (
        <div className="flex">
          <div>
            <BlockWeigth />
            <BlockTasks />
          </div>
          <div>
            <BlockCallories />
            <BlockAwards />
          </div>
        </div>
      )}
    </>
  )
}
