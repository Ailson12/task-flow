import { Board } from '@/types/board'
import { httpClient } from '@/configs/api'
import { CreateBoard } from './board-service.type'

const BASE_URL = 'board'

const findAll = async () => {
  const response = await httpClient.get<Board[]>(BASE_URL)
  return response.data
}

const create = async (body: CreateBoard) => {
  await httpClient.post(BASE_URL, body)
}

const update = async (id: number, body: CreateBoard) => {
  await httpClient.put(`${BASE_URL}/${id}`, body)
}

const remove = async (id: number) => {
  await httpClient.delete(`${BASE_URL}/${id}`)
}

const updateOrCreate = (body: CreateBoard, id = 0) => {
  return id ? update(id, body) : create(body)
}

export const boardService = {
  create,
  remove,
  update,
  findAll,
  updateOrCreate,
}
