import { Board, BoardService } from '@/services/board/board'

export const boardServiceMock: BoardService = {
  findAll() {
    const boards: Board[] = [
      {
        id: 'ab123',
        name: 'Marketing',
      },
      {
        id: 'yu931',
        name: 'RoadMap',
      },
    ]

    return Promise.resolve(boards)
  },
}
