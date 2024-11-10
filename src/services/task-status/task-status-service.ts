import { httpClient } from '@/configs/api'
import { TaskStatus } from '@/types/task-status'
import { FindTaskStatusByBoardParams } from './task-status.type'

const baseUrl = 'task-status'

const findAll = async () => {
  const response = await httpClient.get<TaskStatus[]>(`${baseUrl}/all`)
  return response.data
}

const findAllByBoard = async (params: FindTaskStatusByBoardParams) => {
  const response = await httpClient.get<TaskStatus[]>(`${baseUrl}/all/board`, {
    params,
  })
  return response.data
}

export const taskStatusService = {
  findAll,
  findAllByBoard,
}
