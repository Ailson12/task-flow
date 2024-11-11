import { httpClient } from '@/configs/api'
import { CreateTask, FindTaskByBoardParams } from './task-service.type'
import { Task } from '@/types/task'

const baseUrl = 'task'

const create = (body: CreateTask) => {
  return httpClient.post(baseUrl, body)
}

const findAllByBoard = async (params: FindTaskByBoardParams) => {
  const response = await httpClient.get<Task[]>(`${baseUrl}/board`, {
    params,
  })

  return response.data
}

export const taskService = {
  create,
  findAllByBoard,
}
