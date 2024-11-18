import { FC, ReactNode } from 'react'
import * as S from './styles'

export type DialogRootProps = {
  open: boolean
  children: ReactNode
  maxWidth?: number
}

export const DialogRoot: FC<DialogRootProps> = ({
  open,
  maxWidth,
  children,
}) => {
  if (!open) {
    return null
  }

  return (
    <S.DialogWrapper open={open}>
      <S.DialogContent $maxWidth={maxWidth}>{children}</S.DialogContent>
    </S.DialogWrapper>
  )
}
