import { FC, TextareaHTMLAttributes } from 'react'
import * as S from './styles'

type TextAreaProps = {
  label?: string
  textAreaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>
}

export const TextArea: FC<TextAreaProps> = ({ label, textAreaProps }) => {
  return (
    <div className="w-100">
      <S.Label>
        {label}
        <S.TextAreaInput rows={5} {...textAreaProps} />
      </S.Label>
    </div>
  )
}
