import BlockDialog from './BlockDialog'
import { Progress } from '../ui/progress'
import { useMediaQuery } from 'usehooks-ts'
import type { BlockMainContentProps } from '@/types/BlockMainContentProps'

export function BlockMainContent({
  variant,
  icon,
  title1,
  title2,
  dialogTriggerText,
  dialogHeader,
  titleNumber,
  isButtonVisible,
  defaultDialogValue,
  progressValue,
  progressText,
  indicatorStyle,
  footerText,
  onSave,
}: BlockMainContentProps) {
  const isMobile = !useMediaQuery('(min-width: 768px), (max-width: 639.5px)')
  const isSmallMobile = !useMediaQuery('(min-width: 400.5px)')

  return (
    <>
      {!(isMobile || isSmallMobile) && (
        <div className="flex flex-row justify-around items-center mb-3">
          {icon}
          <div className="grow flex flex-row justify-center items-end">
            <p>
              <b className="text-xl mb-2">{title1 + ' -'}</b>
              <b className="text-4xl mb-2">{` ${titleNumber} `}</b>
              <b className="text-2xl mb-2">{title2}</b>
            </p>
          </div>
        </div>
      )}
      {(isMobile || isSmallMobile) && (
        <div className="flex flex-row justify-around items-center mb-3">
          {icon}
          <div className="grow">
            <p className="text-xl text-center">
              <b>{title1}</b>
            </p>
            <p className="text-xl mb-1 text-center">
              <b className="text-4xl">{` ${titleNumber} `}</b>
              <b className="text-2xl">{title2}</b>
            </p>
          </div>
        </div>
      )}
      {isButtonVisible && (
        <BlockDialog
          variant={variant}
          dialogTriggerText={dialogTriggerText}
          dialogHeader={dialogHeader}
          defaultValue={defaultDialogValue}
          onSave={onSave}
        />
      )}
      <Progress value={progressValue} className={`mb-2 ${indicatorStyle}`} />
      <p className="text-center">{progressText}</p>
      <p className="text-center mt-2">{`Не забывай записывать ${footerText}!`}</p>
      <p className="text-center">{`Каждый день за это ты получаешь звёздочки!`}</p>
    </>
  )
}
