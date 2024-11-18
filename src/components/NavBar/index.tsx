import * as S from './styles'
import { Text } from '../Text'
import { Button } from '../Button'
import { FC, useState } from 'react'
import { Dropdown } from '../Dropdown'
import MenuIcon from '@/assets/menu.svg?react'
import { useBoardStore } from '@/store/board.store'
import { AddNewTask } from './components/AddNewTask'
import { useSidebarStore } from '@/store/sidebar.store'

export const NavBar: FC = () => {
  const [taskOpen, setTaskOpen] = useState(false)

  const { toggleOpen } = useSidebarStore()
  const { boardSelected } = useBoardStore()

  return (
    <S.Container>
      <S.SidebarControl>
        <MenuIcon
          onClick={toggleOpen}
          cursor={'pointer'}
          height={33}
          width={33}
        />

        <Text size={24} weight={500}>
          {boardSelected?.title ?? 'Quadro vazio'}
        </Text>
      </S.SidebarControl>

      <div className="d-flex align-center gap-2">
        <Button onClick={() => setTaskOpen(true)}>Nova atividade</Button>
        <Dropdown items={['Excluir', 'Editar']} />
      </div>

      <AddNewTask open={taskOpen} onClose={() => setTaskOpen(false)} />
    </S.Container>
  )
}
