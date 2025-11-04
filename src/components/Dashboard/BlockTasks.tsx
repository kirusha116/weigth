import { lazy } from 'react'

const Block = lazy(() =>
  import('./Block').then(module => ({ default: module.Block })),
)
const BlockTasksOrAwardsDays = lazy(() =>
  import('./BlockTasksOrAwardsDays').then(module => ({
    default: module.BlockTasksOrAwardsDays,
  })),
)
export default function BlockTasks() {
  return (
    <Block>
      <BlockTasksOrAwardsDays variant="tasks" />
    </Block>
  )
}
