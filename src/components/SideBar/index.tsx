import { generateUUID } from '@/helpers'
import * as S from './styles'
import logo from '@/assets/logo.svg'
import { Text } from '../Text'
import { SidebarLink } from './components/SidebarLink'
import { useMemo, useState } from 'react'
import { colors } from '@/styles/colors'
import { useSidebarStore } from '@/store/sidebar.store'

export const SideBar = () => {
  const { open } = useSidebarStore()
  const [activeIndex, setActiveIndex] = useState(0)

  const links = useMemo(
    () => [
      {
        id: generateUUID(),
        title: 'Plataforma',
      },
      {
        id: generateUUID(),
        title: 'Marketing',
      },
      {
        id: generateUUID(),
        title: 'RoadMap',
      },
    ],
    []
  )

  return (
    <S.Wrapper $open={open}>
      <S.SideBarHeader>
        <img src={logo} alt="logo" width={44} height={44} />
        {open && <h1>TaskFlow</h1>}
      </S.SideBarHeader>

      <Text
        marginBottom={'1rem'}
        spacing={1}
        weight={600}
        size={13}
        color={colors.c2}
      >
        TODOS QUADROS ({links.length})
      </Text>

      <ul>
        {links.map((link, index) => (
          <li key={link.id} onClick={() => setActiveIndex(index)}>
            <SidebarLink
              isActive={open && activeIndex === index}
              title={link.title}
            />
          </li>
        ))}
        <li>
          <SidebarLink color={colors.c1} title={'+ Criar novo quadro'} />
        </li>
      </ul>
    </S.Wrapper>
  )
}
