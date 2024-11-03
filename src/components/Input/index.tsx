import { FC, InputHTMLAttributes } from 'react'
import * as S from './styles'

type InputProps = {
  label: string
  errorMessage?: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export const Input: FC<InputProps> = ({ label, errorMessage, inputProps }) => {
  const hasErrorMessage = (errorMessage ?? '').trim().length > 0

  return (
    <div className="w-100">
      <S.Label>
        {label}
        <S.Input {...inputProps} />

        <S.ErrorMessage
          $isVisible={hasErrorMessage}
          aria-hidden={!hasErrorMessage}
        >
          {errorMessage}
        </S.ErrorMessage>
      </S.Label>
    </div>
  )
}
