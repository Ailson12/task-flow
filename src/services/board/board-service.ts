import { Board } from '@/types/board'
import { httpClient } from '@/configs/api'
import { CreateBoard } from './board-service.type'

const findAll = async () => {
  const response = await httpClient.get<Board[]>('board')
  return response.data
}

const create = async (body: CreateBoard) => {
  await httpClient.post('board', body)
}

const remove = async (id: number) => {
  await httpClient.delete(`board/${id}`)
}

export const boardService = {
  findAll,
  create,
  remove,
}
