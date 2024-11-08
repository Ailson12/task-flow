import { FC } from 'react'
import { colors } from '@/styles/colors'
import { Chip } from '@/components/Chip'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Select } from '@/components/Select'
import { SidebarLink } from '../SidebarLink'
import { TextArea } from '@/components/TextArea'
import { useCreateNewBoard } from '../../hooks/use-create-new-board'

export const CreateNewBoard: FC = () => {
  const { open, formik, onOpen, onClose, taskStatus } = useCreateNewBoard()
  const { addTaskStatus, removeTaskStatus } = taskStatus

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
        <Dialog.Header title="Adicionar novo quadro" onClose={onClose} />

        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-2"
        >
          <Input
            label="Título"
            errorMessage={formik.errors.title}
            inputProps={{
              name: 'title',
              value: formik.values.title,
              onChange: formik.handleChange,
            }}
          />
          <TextArea
            label="Descrição"
            errorMessage={formik.errors.description}
            textAreaProps={{
              name: 'description',
              onChange: formik.handleChange,
              value: formik.values.description,
            }}
          />

          <div className="mb-2">
            <div className="d-flex gap-2 align-end mb-2">
              <Select
                label="Status"
                options={taskStatus.options}
                selectOptions={{
                  value: taskStatus.value,
                  onChange: ({ target }) => {
                    taskStatus.onChange(+target.value)
                  },
                }}
              />

              <Button
                variant="secondary"
                onClick={addTaskStatus}
                style={{
                  fontSize: 14,
                }}
                type="button"
              >
                Adicionar
              </Button>
            </div>

            <ul className="d-flex gap-1 flex-wrap">
              {taskStatus.taskStatusSelected.map((taskStatus) => (
                <li key={taskStatus.id}>
                  <Chip
                    closeButtonProps={{
                      title: 'Remover status',
                    }}
                    onRemove={() => removeTaskStatus(taskStatus.id)}
                  >
                    {taskStatus.title}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>

          <Button type="submit">Salvar</Button>
        </form>
      </Dialog.Root>
    </>
  )
}
