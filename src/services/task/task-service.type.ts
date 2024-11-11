export type CreateTask = {
  title: string
  description: string
  order?: number
  taskStatusId: number
  boardId: number
}

export type FindTaskByBoardParams = {
  boardId: number
}
