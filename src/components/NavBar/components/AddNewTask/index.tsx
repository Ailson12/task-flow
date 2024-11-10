import { FC } from 'react'
import { Input } from '@/components/Input'
import { Dialog } from '@/components/Dialog'
import { Select } from '@/components/Select'
import { Button } from '@/components/Button'
import { TextArea } from '@/components/TextArea'
import { useAddNewTask } from '../../hooks/use-add-new-task'

type AddNewTaskProps = {
  open: boolean
  onClose(): void
}

export const AddNewTask: FC<AddNewTaskProps> = ({ open, onClose }) => {
  const { formik, taskStatus } = useAddNewTask({
    onClose,
  })

  return (
    <Dialog.Root open={open}>
      <Dialog.Header title="Adicionar nova atividade" onClose={onClose} />

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

        <Select
          label="Status"
          options={taskStatus.options}
          errorMessage={formik.errors.taskStatusId}
          selectProps={{
            name: 'taskStatusId',
            onChange: formik.handleChange,
            value: formik.values.taskStatusId,
          }}
        />

        <Button type="submit">Criar atividade</Button>
      </form>
    </Dialog.Root>
  )
}
