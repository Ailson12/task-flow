import { ButtonHTMLAttributes, FC } from 'react'
import * as S from './styles'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export const Button: FC<ButtonProps> = ({ variant, children, ...props }) => {
  return (
    <S.ButtonWrapper $variant={variant} {...props}>
      {children}
    </S.ButtonWrapper>
  )
}
