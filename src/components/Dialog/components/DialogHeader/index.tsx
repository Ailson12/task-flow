import { FC, ReactNode } from 'react'
import CloseIcon from '@/assets/close_icon.svg?react'
import { Text } from '@/components/Text'
import styled from 'styled-components'
import { colors } from '@/styles/colors'

type DialogHeaderProps = {
  title?: string
  children?: ReactNode
}

const HeaderWrapper = styled.header({
  display: 'flex',
  marginBottom: '1rem',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const ButtonClose = styled.button({
  display: 'flex',
  padding: 4,
  borderRadius: '100%',
  background: colors.c7,
})

export const DialogHeader: FC<DialogHeaderProps> = ({ title, children }) => {
  return (
    <HeaderWrapper>
      <div>
        {title ? (
          <Text size={20} weight={500}>
            {title}
          </Text>
        ) : (
          children
        )}
      </div>

      <ButtonClose>
        <CloseIcon />
      </ButtonClose>
    </HeaderWrapper>
  )
}
