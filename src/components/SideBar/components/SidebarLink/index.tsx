import { FC, useMemo } from 'react'
import BoardIcon from '@/assets/board-icon.svg?react'
import { Text } from '@/components/Text'
import * as S from './styles'
import { colors } from '@/styles/colors'

type Props = {
  color?: string
  title: string
  isActive?: boolean
}

export const SidebarLink: FC<Props> = ({ title, color, isActive = false }) => {
  const currentColor = useMemo(() => {
    if (color) {
      return color
    }

    return isActive ? colors.c4 : colors.c2
  }, [color, isActive])

  return (
    <S.Container $isActive={isActive}>
      <BoardIcon height={22} width={22} fill={currentColor} />

      <Text color={currentColor} weight={500}>
        {title}
      </Text>
    </S.Container>
  )
}
