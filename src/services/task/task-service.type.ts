export type CreateTask = {
  title: string
  description: string
  order?: number
  taskStatusId: number
  boardId: number
}

export type TaskOrderBody = {
  tasks: Array<{
    order: number
    taskId: number
    taskStatusId: number
  }>
}

export type FindTaskByBoardParams = {
  boardId: number
}
