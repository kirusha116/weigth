import { lazy } from 'react'

const Block = lazy(() =>
  import('./Block').then(module => ({ default: module.Block })),
)
const BlockTasksOrAwardsDays = lazy(() =>
  import('./BlockTasksOrAwardsDays').then(module => ({
    default: module.BlockTasksOrAwardsDays,
  })),
)
export default function BlockAwards() {
  return (
    <Block>
      <BlockTasksOrAwardsDays variant="awards" />
    </Block>
  )
}
