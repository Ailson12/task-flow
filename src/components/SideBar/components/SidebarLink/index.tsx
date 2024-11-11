import * as S from './styles'
import { FC, useMemo } from 'react'
import { Text } from '@/components/Text'
import { colors } from '@/styles/colors'
import BoardIcon from '@/assets/board-icon.svg?react'

export type SidebarLinkProps = {
  color?: string
  title: string
  isActive?: boolean
  onClick?: () => void
}

export const SidebarLink: FC<SidebarLinkProps> = ({
  title,
  color,
  onClick,
  isActive = false,
}) => {
  const currentColor = useMemo(() => {
    if (color) {
      return color
    }

    return isActive ? colors.c4 : colors.c2
  }, [color, isActive])

  return (
    <S.Container $isActive={isActive} onClick={onClick}>
      <BoardIcon
        style={{ minWidth: 22 }}
        height={22}
        width={22}
        fill={currentColor}
      />

      <Text color={currentColor} weight={500}>
        {title}
      </Text>
    </S.Container>
  )
}
