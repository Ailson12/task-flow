import { FC, ReactNode } from 'react'
import * as S from './styles'

export type DialogRootProps = {
  open: boolean
  children: ReactNode
}

export const DialogRoot: FC<DialogRootProps> = ({ open, children }) => {
  if (!open) {
    return null
  }

  return (
    <S.DialogWrapper open={open}>
      <S.DialogContent>{children}</S.DialogContent>
    </S.DialogWrapper>
  )
}
