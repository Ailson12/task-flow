import { Board } from '@/types/board'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}board`, () => {
    const boards: Board[] = [
      {
        id: 'ab123',
        title: 'Marketing',
      },
      {
        id: 'yu931',
        title: 'RoadMap',
      },
    ]

    return HttpResponse.json(boards)
  }),
]
