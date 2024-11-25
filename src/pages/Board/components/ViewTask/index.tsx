import { FC } from 'react'
import { Task } from '@/types/task'
import { Text } from '@/components/Text'
import { Dialog } from '@/components/Dialog'
import { DialogDefaultProps } from '@/components/Dialog/components/DialogRoot'

type ViewTaskProps = DialogDefaultProps & {
  task: Task
}

export const ViewTask: FC<ViewTaskProps> = ({ open, task, onClose }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Header onClose={onClose} title={task.title} />
      <Text fontSize={15}>{task.description}</Text>
    </Dialog.Root>
  )
}
