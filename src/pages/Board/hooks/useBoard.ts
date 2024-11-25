import { toast } from 'react-toastify'
import { Task, TaskGrouped } from '@/types/task'
import { TaskStatus } from '@/types/task-status'
import { useBoardStore } from '@/store/board.store'
import { DragEventHandler, useEffect, useMemo, useState } from 'react'
import { generateUUID } from '@/helpers/generate-uuid'
import { taskService } from '@/services/task/task-service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { taskStatusService } from '@/services/task-status/task-status-service'

export const useBoard = () => {
  const queryClient = useQueryClient()
  const { boardSelected } = useBoardStore()

  const [isDraggable, setIsDraggable] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskSelectedRemoved, setTaskSelectedRemoved] = useState<Task | null>(
    null
  )
  const [taskSelectedEdit, setTaskSelectedEdit] = useState<Task | null>(null)

  const { data: dataTasks } = useQuery({
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

  useEffect(() => {
    setTasks(dataTasks ?? [])
  }, [dataTasks])

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

  const onDragStart: DragEventHandler<HTMLDivElement> = (event) => {
    const id = event.currentTarget.dataset?.id
    if (id) {
      setIsDraggable(true)
      event.dataTransfer.setData('text/plain', id)
    }
  }

  const onDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const onDragEnd: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    setIsDraggable(false)
  }

  const onDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const sourceId = event.dataTransfer.getData('text/plain')
    const targetId = event.currentTarget.dataset?.id

    if (sourceId && targetId) {
      reorderTasks(parseInt(sourceId), parseInt(targetId))
      setIsDraggable(false)
    }
  }

  const reorderTasks = (sourceId: number, targetId: number) => {
    const source = findTaskById(sourceId)
    const target = findTaskById(targetId)

    if (!source || !target) return

    const hasSameStatus = source?.taskStatus.id === target?.taskStatus.id
    if (hasSameStatus) {
      reorderTasksWithSameStatus(source, target)
    } else {
      reorderTasksWithDifferentStatus(source, target)
    }
  }

  const getTasksGroupedByStatus = (taskStatus: TaskStatus) => {
    return copyObject<Task[]>(
      tasks
        ?.filter((task) => task.taskStatus.id === taskStatus.id)
        .sort((a, b) => a.order - b.order)
    )
  }

  const reorderTasksWithDifferentStatus = (source: Task, target: Task) => {
    const tasksGroupedByStatus = getTasksGroupedByStatus(target.taskStatus)

    const targetIndex = tasksGroupedByStatus.findIndex((task) => {
      return task.id === target.id
    })

    tasksGroupedByStatus.splice(targetIndex, 0, {
      ...source,
      taskStatus: target.taskStatus,
    })

    tasksGroupedByStatus.forEach((task, index) => {
      task.order = index + 1
    })

    const updatedTasks = tasks
      .filter(
        (task) =>
          task.taskStatus.id !== target.taskStatus.id && source.id !== task.id
      )
      .concat(tasksGroupedByStatus)

    setTasks(updatedTasks)
    updateOrder(tasksGroupedByStatus)
  }

  const reorderTasksWithSameStatus = (source: Task, target: Task) => {
    const tasksGroupedByStatus = getTasksGroupedByStatus(source.taskStatus)

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
    updateOrder(tasksGroupedByStatus)
  }

  const findTaskById = (id: number) => {
    return (tasks ?? [])?.find((task) => task.id === id)
  }

  const findTaskStatusById = (id: number) => {
    return (tasksStatus ?? [])?.find((taskStatus) => taskStatus.id === id)
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
          taskStatusId: row.taskStatus.id,
        })),
      }),
      {
        error: 'Erro ao atualizar ordem.',
        success: 'Ordem atualizada com sucesso!',
        pending: 'Atualizando...',
      }
    )
  }

  const onDropDropzone: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()

    const sourceId = event.dataTransfer.getData('text/plain')
    const statusId = event.currentTarget.dataset?.status

    const source = sourceId ? findTaskById(+sourceId) : null
    const status = statusId ? findTaskStatusById(+statusId) : null

    if (status && source) {
      source.taskStatus = status
      const tasksGroupedByStatus = getTasksGroupedByStatus(status)
      source.order = tasksGroupedByStatus.length + 1

      tasksGroupedByStatus.forEach((task, index) => {
        task.order = index + 1
      })

      setTasks([...tasks])
      updateOrder(tasksGroupedByStatus)
    }
  }

  const onDragOverDropzone: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const draggable = {
    onDrop,
    onDragEnd,
    onDragOver,
    isDraggable,
    onDragStart,
    onDropDropzone,
    onDragOverDropzone,
  }

  return {
    draggable,
    tasksFormatted,
    taskSelectedEdit,
    removeTaskSelected,
    setTaskSelectedEdit,
    taskSelectedRemoved,
    setTaskSelectedRemoved,
  }
}
