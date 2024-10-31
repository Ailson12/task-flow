import { Dialog } from '@/components/Dialog'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { TextArea } from '@/components/TextArea'
import { FC } from 'react'
import { SidebarLink } from '../SidebarLink'
import { colors } from '@/styles/colors'
import { useCreateNewBoard } from './hooks/use-create-new-board'
import { Button } from '@/components/Button'

export const CreateNewBoard: FC = () => {
  const { open, onOpen, onClose, taskStatus } = useCreateNewBoard()

  return (
    <>
      <li>
        <SidebarLink
          color={colors.c1}
          title={'+ Criar novo quadro'}
          onClick={onOpen}
        />
      </li>

      <Dialog.Root open={open}>
        <Dialog.Header title="Adicionar nova Atividade" onClose={onClose} />

        <div className="d-flex flex-column gap-2">
          <Input label="Título" />
          <TextArea label="Descrição" />

          <div className="d-flex gap-2 align-end mb-2">
            <Select label="Status" options={taskStatus.options} />
            <Button
              variant="secondary"
              style={{
                fontSize: 14,
              }}
            >
              Adicionar
            </Button>
          </div>

          <Button>Salvar</Button>
        </div>
      </Dialog.Root>
    </>
  )
}
