import { useMemo } from 'react'
import { Task, TaskGrouped } from '@/types/task'
import { TaskStatus } from '@/types/task-status'
import { useQuery } from '@tanstack/react-query'
import { useBoardStore } from '@/store/board.store'
import { generateUUID } from '@/helpers/generate-uuid'
import { taskService } from '@/services/task/task-service'

export const useBoard = () => {
  const { boardSelected } = useBoardStore()

  const { data: tasks } = useQuery({
    queryKey: ['list-task', boardSelected?.id],
    queryFn: () => {
      return taskService.findAllByBoard({
        boardId: boardSelected?.id ?? 0,
      })
    },
    enabled: Boolean(boardSelected?.id),
  })

  const getTasksGroupedByStatus = () => {
    const groupedData = new Map<number, Task[]>()

    tasks?.forEach((task) => {
      const targetTasks = groupedData.get(task.taskStatus.id) ?? []
      groupedData.set(task.taskStatus.id, targetTasks.concat(task))
    })

    return Array.from(groupedData.values())
  }

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
    const tasksGrouped = getTasksGroupedByStatus()

    return tasksGrouped.map<TaskGrouped>((tasks) => {
      const status = tasks[0]?.taskStatus
      return {
        tasks,
        status,
        id: generateUUID(),
        color: getColorByStatus(status),
      }
    })
  }, [tasks])

  return {
    tasksFormatted,
  }
}
