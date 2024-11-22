import { FC } from 'react'
import { Chip } from '../Chip'
import { Input } from '../Input'
import { Button } from '../Button'
import { Dialog } from '../Dialog'
import { Select } from '../Select'
import { TextArea } from '../TextArea'
import { useBoardFormDialog } from './hooks/useBoardFormDialog'

type BoardFormDialogProps = {
  open: boolean
  onClose(): void
}

export const BoardFormDialog: FC<BoardFormDialogProps> = ({
  open,
  onClose,
}) => {
  const { formik, taskStatus } = useBoardFormDialog()

  return (
    <Dialog.Root open={open}>
      <Dialog.Header title="Adicionar novo quadro" onClose={onClose} />

      <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-2">
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
              selectProps={{
                value: taskStatus.value,
                onChange: ({ target }) => {
                  taskStatus.onChange(+target.value)
                },
              }}
            />

            <Button
              variant="secondary"
              onClick={taskStatus.addTaskStatus}
              style={{
                fontSize: 14,
              }}
              type="button"
            >
              Adicionar
            </Button>
          </div>

          <ul className="d-flex gap-1 flex-wrap">
            {taskStatus.taskStatusSelected.map((currentTaskStatus) => (
              <li key={currentTaskStatus.id}>
                <Chip
                  closeButtonProps={{
                    title: 'Remover status',
                  }}
                  onRemove={() => {
                    taskStatus.removeTaskStatus(currentTaskStatus.id)
                  }}
                >
                  {currentTaskStatus.title}
                </Chip>
              </li>
            ))}
          </ul>
        </div>

        <Button type="submit">Salvar</Button>
      </form>
    </Dialog.Root>
  )
}
