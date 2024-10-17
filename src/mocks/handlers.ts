import { Board } from '@/services/board/board'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/board`, () => {
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

    return HttpResponse.json(boards)
  }),
]
