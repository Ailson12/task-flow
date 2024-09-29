import { httpClient } from '../api'
import { Board, BoardService } from './board'

const findAll = async () => {
  const response = await httpClient.get<Board[]>('board')
  return response.data
}

export const boardService: BoardService = {
  findAll,
}
