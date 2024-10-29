import { httpClient } from '@/configs/api'
import { TaskStatus } from '@/types/task-status'

const findAll = async () => {
  const response = await httpClient.get<TaskStatus[]>('task-status/all')
  return response.data
}

export const taskStatusService = {
  findAll,
}
