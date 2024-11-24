import {
  CreateTask,
  TaskOrderBody,
  FindTaskByBoardParams,
} from './task-service.type'
import { Task } from '@/types/task'
import { httpClient } from '@/configs/api'

const baseUrl = 'task'

const create = (body: CreateTask) => {
  return httpClient.post(baseUrl, body)
}

const update = (id: number, body: CreateTask) => {
  return httpClient.put(`${baseUrl}/${id}`, body)
}

const updateOrder = async (body: TaskOrderBody) => {
  return await httpClient.put(`${baseUrl}/update-order`, body)
}

const remove = async (id: number) => {
  await httpClient.delete(`${baseUrl}/${id}`)
}

const findAllByBoard = async (params: FindTaskByBoardParams) => {
  const response = await httpClient.get<Task[]>(`${baseUrl}/board`, {
    params,
  })

  return response.data
}

const updateOrCreate = (body: CreateTask, id = 0) => {
  return id ? update(id, body) : create(body)
}

export const taskService = {
  create,
  remove,
  update,
  updateOrder,
  updateOrCreate,
  findAllByBoard,
}
