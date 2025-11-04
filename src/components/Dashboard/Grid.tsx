import BlockWeigth from './BlockWeigth'
import BlockCallories from './BlockCallories'
import BlockTasks from './BlockTasks'
import BlockAwards from './BlockAwards'
import { useMediaQuery } from 'usehooks-ts'

export default function Grid() {
  const isMobile = !useMediaQuery('(min-width: 768px)')
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
          <div className="w-1/2">
            <BlockWeigth />
            <BlockTasks />
          </div>
          <div className="w-1/2">
            <BlockCallories />
            <BlockAwards />
          </div>
        </div>
      )}
    </>
  )
}
