import { FC, HTMLAttributes, ReactNode } from 'react'
import CloseIcon from '@/assets/close_icon.svg?react'
import { ChipCloseWrapper, ChipWrapper } from './styles'

type ChipProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  onRemove?: () => void
  closeButtonProps?: HTMLAttributes<HTMLButtonElement>
}

export const Chip: FC<ChipProps> = ({
  children,
  onRemove,
  closeButtonProps,
  ...props
}) => {
  return (
    <ChipWrapper {...props}>
      {children}

      {onRemove && (
        <ChipCloseWrapper {...closeButtonProps} onClick={onRemove}>
          <CloseIcon height={18} cursor={'pointer'} width={18} />
        </ChipCloseWrapper>
      )}
    </ChipWrapper>
  )
}
