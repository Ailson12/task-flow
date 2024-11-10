import { httpClient } from '@/configs/api'
import { CreateTask } from './task-service.type'

const create = (body: CreateTask) => {
  return httpClient.post('task', body)
}

export const taskService = {
  create,
}
