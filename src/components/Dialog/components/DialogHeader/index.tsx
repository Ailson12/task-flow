import { FC, ReactNode, useEffect } from 'react'
import CloseIcon from '@/assets/close_icon.svg?react'
import { Text } from '@/components/Text'
import * as S from './styles'

export type DialogHeaderProps = {
  title?: string
  children?: ReactNode
}

export const DialogHeader: FC<DialogHeaderProps> = ({ title, children }) => {
  useEffect(() => {
    if (title?.trim()?.length && Boolean(children)) {
      console.error('property title and children cannot be entered together')
    }
  }, [title, children])

  return (
    <S.HeaderWrapper>
      <div>
        {title ? (
          <Text size={20} weight={500}>
            {title}
          </Text>
        ) : (
          children
        )}
      </div>

      <S.ButtonClose aria-label="Fechar" title="Fechar">
        <CloseIcon aria-hidden="true" />
      </S.ButtonClose>
    </S.HeaderWrapper>
  )
}
