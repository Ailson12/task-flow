import { FC } from 'react'
import * as S from './styles'
import { Text } from '../Text'
import { Button } from '../Button'
import { Dropdown } from '../Dropdown'
import { useNavbar } from './hooks/useNavbar'
import MenuIcon from '@/assets/menu.svg?react'
import { DialogConfirm } from '../DialogConfirm'
import { AddNewTask } from './components/AddNewTask'
import { BoardFormDialog } from '../BoardFormDialog'

export const NavBar: FC = () => {
  const {
    taskOpen,
    toggleOpen,
    boardSelected,
    removeBoardSelected,
    confirmRemoveIsOpen,
  } = useNavbar()

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

      <div className="d-flex align-center flex-wrap gap-1">
        <Button onClick={() => taskOpen.onChange(true)}>Nova atividade</Button>
        {boardSelected && (
          <Dropdown
            items={[
              {
                key: 'board-trash',
                label: 'Excluir',
                onClick() {
                  confirmRemoveIsOpen.onChange(true)
                },
              },
              {
                key: 'board-edit',
                label: 'Editar',
                onClick: (row) => {
                  console.log('edti', row)
                },
              },
            ]}
          />
        )}
      </div>

      <BoardFormDialog open={false} onClose={console.log} />

      <AddNewTask
        open={taskOpen.value}
        onClose={() => taskOpen.onChange(false)}
      />

      <DialogConfirm
        onConfirm={removeBoardSelected}
        open={confirmRemoveIsOpen.value}
        onClose={() => confirmRemoveIsOpen.onChange(false)}
      />
    </S.Container>
  )
}
