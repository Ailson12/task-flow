import { DragEventHandler, FC } from 'react'
import * as S from './styles'
import { Text } from '@/components/Text'
import { colors } from '@/styles/colors'
import { useBoard } from './hooks/useBoard'
import { AddNewTask } from '@/components/NavBar/components/AddNewTask'
import { Dropdown } from '@/components/Dropdown'
import { DialogConfirm } from '@/components/DialogConfirm'
import { Task } from '@/types/task'
import { taskService } from '@/services/task/task-service'
import { toast } from 'react-toastify'

export const Board: FC = () => {
  const {
    tasks,
    setTasks,
    tasksFormatted,
    taskSelectedEdit,
    removeTaskSelected,
    taskSelectedRemoved,
    setTaskSelectedEdit,
    setTaskSelectedRemoved,
  } = useBoard()

  const onDragStart: DragEventHandler<HTMLDivElement> = (event) => {
    const id = event.currentTarget.dataset?.id
    if (id) {
      event.dataTransfer.setData('text/plain', id)
    }
  }

  const onDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const onDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()

    const sourceId = event.dataTransfer.getData('text/plain')
    const targetId = event.currentTarget.dataset?.id

    if (sourceId && targetId) {
      reorderTasks(parseInt(sourceId), parseInt(targetId))
    }
  }

  const reorderTasks = (sourceId: number, targetId: number) => {
    const source = findTaskById(sourceId)
    const target = findTaskById(targetId)

    if (!source || !target) return

    const hasSameStatus = source?.taskStatus.id === target?.taskStatus.id
    if (hasSameStatus) {
      reorderTasksWithSameStatus(source, target)
    }
  }

  const reorderTasksWithSameStatus = (source: Task, target: Task) => {
    const tasksGroupedByStatus = copyObject<Task[]>(
      tasks
        ?.filter((task) => task.taskStatus.id === source.taskStatus.id)
        .sort((a, b) => a.order - b.order)
    )

    const sourceIndex = tasksGroupedByStatus.findIndex(
      (task) => task.id === source.id
    )
    const targetIndex = tasksGroupedByStatus.findIndex(
      (task) => task.id === target.id
    )

    const [removedTask] = tasksGroupedByStatus.splice(sourceIndex, 1)
    tasksGroupedByStatus.splice(targetIndex, 0, removedTask)

    tasksGroupedByStatus.forEach((task, index) => {
      task.order = index + 1
    })

    const updatedTasks = tasks
      .filter((task) => task.taskStatus.id !== source.taskStatus.id)
      .concat(tasksGroupedByStatus)

    setTasks(updatedTasks)
    updateOrder(updatedTasks)
  }

  const findTaskById = (id: number) => {
    return (tasks ?? [])?.find((task) => task.id === id)
  }

  const copyObject = function <T = unknown>(value: unknown) {
    return JSON.parse(JSON.stringify(value)) as T
  }

  const updateOrder = (updatedTasks: Task[]) => {
    toast.promise(
      taskService.updateOrder({
        tasks: updatedTasks.map((row) => ({
          taskId: row.id,
          order: row.order ?? 0,
        })),
      }),
      {
        error: 'Erro ao atualizar ordem.',
        success: 'Ordem atualizada com sucesso!',
        pending: 'Atualizando...',
      }
    )
  }

  return (
    <>
      <S.Wrapper>
        <S.Container>
          {tasksFormatted.map((row) => (
            <div key={row.id}>
              <S.StatusContainer>
                <S.StatusIndicator $bgColor={row.color} />
                <Text
                  size={14}
                  color={colors.c2}
                  weight={500}
                  letterSpacing={1}
                >
                  {row.status.title} ({row.tasks.length})
                </Text>
              </S.StatusContainer>

              <S.TaskContainer>
                {row.tasks.map((task) => {
                  const title = task.title.slice(0, 60)
                  const hasSuffix = task.title.length > 60

                  return (
                    <S.Card
                      onDrop={onDrop}
                      draggable={true}
                      key={task.title}
                      data-id={task.id}
                      $order={task.order}
                      onDragOver={onDragOver}
                      onDragStart={onDragStart}
                    >
                      <Text weight={500} size={14}>
                        {`${title}${hasSuffix ? '...' : ''}`}- {task.order}
                      </Text>
                      <Dropdown
                        wrapperProps={{
                          style: {
                            alignSelf: 'flex-start',
                          },
                        }}
                        items={[
                          {
                            key: 'task-trash',
                            label: 'Excluir',
                            onClick() {
                              setTaskSelectedRemoved(task)
                            },
                          },
                          {
                            key: 'task-edit',
                            label: 'Editar',
                            onClick() {
                              setTaskSelectedEdit(task)
                            },
                          },
                        ]}
                      />
                    </S.Card>
                  )
                })}
              </S.TaskContainer>
            </div>
          ))}
        </S.Container>
      </S.Wrapper>

      <DialogConfirm
        onConfirm={removeTaskSelected}
        open={Boolean(taskSelectedRemoved)}
        onClose={() => setTaskSelectedRemoved(null)}
      />

      {Boolean(taskSelectedEdit) && (
        <AddNewTask
          task={taskSelectedEdit}
          open={Boolean(taskSelectedEdit)}
          onClose={() => setTaskSelectedEdit(null)}
        />
      )}
    </>
  )
}
