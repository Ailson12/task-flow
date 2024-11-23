import { toast } from 'react-toastify'
import { useMemo, useState } from 'react'
import { Task, TaskGrouped } from '@/types/task'
import { TaskStatus } from '@/types/task-status'
import { useBoardStore } from '@/store/board.store'
import { generateUUID } from '@/helpers/generate-uuid'
import { taskService } from '@/services/task/task-service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { taskStatusService } from '@/services/task-status/task-status-service'

export const useBoard = () => {
  const queryClient = useQueryClient()
  const { boardSelected } = useBoardStore()

  const [taskOpen, setTaskOpen] = useState(false)
  const [taskSelectedRemoved, setTaskSelectedRemoved] = useState<Task | null>(
    null
  )

  const { data: tasks } = useQuery({
    queryKey: ['list-tasks', boardSelected?.id],
    queryFn: () => {
      return taskService.findAllByBoard({
        boardId: boardSelected?.id ?? 0,
      })
    },
    enabled: Boolean(boardSelected?.id),
  })

  const { data: tasksStatus } = useQuery({
    queryKey: ['list-task-status', boardSelected?.id],
    queryFn: () =>
      taskStatusService.findAllByBoard({
        boardId: boardSelected?.id ?? 0,
      }),
    enabled: Boolean(boardSelected?.id),
  })

  const getColorByStatus = (taskStatus: TaskStatus) => {
    const colors = new Map<string, string>([
      ['A Fazer', '#63B3ED'],
      ['Em Progresso', '#ED8936'],
      ['Em Teste', '#3182CE'],
      ['Concluído', '#38A169'],
    ])

    return colors.get(taskStatus.title) ?? '#A0AEC0'
  }

  const tasksFormatted = useMemo(() => {
    return (tasksStatus ?? [])?.map<TaskGrouped>((status) => {
      const tasksByStatus = tasks?.filter(
        (task) => task.taskStatus.id === status.id
      )

      return {
        status,
        id: generateUUID(),
        tasks: tasksByStatus ?? [],
        color: getColorByStatus(status),
      }
    })
  }, [tasks, tasksStatus])

  const removeTaskSelected = async () => {
    const { id = 0 } = taskSelectedRemoved ?? {}

    await toast.promise(taskService.remove(id), {
      pending: 'Excluindo...',
      error: 'Erro ao excluir atividade',
      success: 'Atividade removida com sucesso!',
    })

    setTaskSelectedRemoved(null)
    queryClient.invalidateQueries({
      queryKey: ['list-tasks'],
    })
  }

  return {
    tasksFormatted,
    taskOpen: {
      value: taskOpen,
      onChange: setTaskOpen,
    },
    removeTaskSelected,
    taskSelectedRemoved,
    setTaskSelectedRemoved,
  }
}
