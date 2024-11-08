import { FC, TextareaHTMLAttributes } from 'react'
import * as S from './styles'

type TextAreaProps = {
  label?: string
  errorMessage?: string
  textAreaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>
}

export const TextArea: FC<TextAreaProps> = ({
  label,
  errorMessage,
  textAreaProps,
}) => {
  const hasErrorMessage = (errorMessage ?? '').trim().length > 0

  return (
    <div className="w-100">
      <S.Label>
        {label}
        <S.TextAreaInput rows={5} {...textAreaProps} />

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
