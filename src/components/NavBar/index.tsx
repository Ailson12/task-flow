import { FC } from 'react'
import { Text } from '../Text'
import * as S from './styles'
import MenuIcon from '@/assets/menu.svg?react'
import { useSidebarStore } from '@/store/sidebar.store'
import { useBoardStore } from '@/store/board.store'

export const NavBar: FC = () => {
  const { toggleOpen } = useSidebarStore()
  const { boardSelected } = useBoardStore()

  return (
    <S.Container>
      <MenuIcon
        onClick={toggleOpen}
        cursor={'pointer'}
        height={33}
        width={33}
      />
      <Text size={24} weight={500}>
        {boardSelected?.title ?? 'Quadro vazio'}
      </Text>
    </S.Container>
  )
}
