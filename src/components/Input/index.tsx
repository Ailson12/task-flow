import { FC, InputHTMLAttributes } from 'react'
import * as S from './styles'

type InputProps = {
  label: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export const Input: FC<InputProps> = ({ label, inputProps }) => {
  return (
    <S.InputWrapper>
      <S.Label>
        {label}
        <S.Input {...inputProps} />
      </S.Label>
    </S.InputWrapper>
  )
}
