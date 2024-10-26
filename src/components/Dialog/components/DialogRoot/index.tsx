import { FC, ReactNode } from 'react'
import * as S from './styles'

type DialogRootProps = {
  open: boolean
  children: ReactNode
}

export const DialogRoot: FC<DialogRootProps> = ({ open, children }) => {
  return (
    <S.DialogWrapper open={open}>
      <S.DialogContent>{children}</S.DialogContent>
    </S.DialogWrapper>
  )
}
