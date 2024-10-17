import { Board } from '@/types/board'
import { http, HttpResponse } from 'msw'

const requests = [
  {
    url: `${import.meta.env.VITE_API_URL}board`,
    method: 'findAll',
    data: () => {
      return [
        {
          id: 'ab123',
          title: 'Marketing',
        },
        {
          id: 'yu931',
          title: 'RoadMap',
        },
      ] satisfies Board[]
    },
  },
]

export const boardServiceMock = requests.map((request) => {
  return http.get(request.url, () => {
    return HttpResponse.json(request.data())
  })
})
