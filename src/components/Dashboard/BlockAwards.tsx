import { Block } from './Block'
import { BlockTasksOrAwardsDays } from './BlockTasksOrAwardsDays'

export default function BlockAwards() {
  return (
    <Block>
      <BlockTasksOrAwardsDays variant="awards" />
    </Block>
  )
}
