import { FC } from 'react'
import { Text } from '../Text'
import * as S from './styles'
import MenuIcon from '@/assets/menu.svg?react'
import { useSidebarStore } from '@/store/sidebar.store'

export const NavBar: FC = () => {
  const { toggleOpen } = useSidebarStore()

  return (
    <S.Container>
      <MenuIcon
        onClick={toggleOpen}
        cursor={'pointer'}
        height={33}
        width={33}
      />
      <Text size={24} weight={500}>
        Plataforma
      </Text>
    </S.Container>
  )
}
