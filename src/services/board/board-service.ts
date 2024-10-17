import { Board } from '@/types/board'
import { httpClient } from '@/configs/api'

const findAll = async () => {
  const response = await httpClient.get<Board[]>('board')
  return response.data
}

export const boardService = {
  findAll,
}
