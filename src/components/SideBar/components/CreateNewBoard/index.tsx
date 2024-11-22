import { FC, useState } from 'react'
import { colors } from '@/styles/colors'
import { SidebarLink } from '../SidebarLink'
import { BoardFormDialog } from '@/components/BoardFormDialog'

export const CreateNewBoard: FC = () => {
  const [open, setOpen] = useState(false)

  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      <li>
        <SidebarLink
          color={colors.c1}
          title={'+ Criar novo quadro'}
          onClick={onOpen}
        />
      </li>

      <BoardFormDialog open={open} onClose={onClose} />
    </>
  )
}
