import { TaskStatus } from '@/types/task-status'
import { http, HttpResponse } from 'msw'

const requests = [
  {
    url: `${import.meta.env.VITE_API_URL}task-status/all`,
    method: 'findAll',
    data: () => {
      return [
        {
          id: 1,
          title: 'Done',
        },
        {
          id: 2,
          title: 'Pending',
        },
      ] satisfies TaskStatus[]
    },
  },
  {
    url: `${import.meta.env.VITE_API_URL}task-status/all/board`,
    method: 'findAllByBoard',
    data: () => {
      return [
        {
          id: 1,
          title: 'Done',
        },
        {
          id: 2,
          title: 'Pending',
        },
      ] satisfies TaskStatus[]
    },
  },
]

export const taskStatusServiceMock = requests.map((request) => {
  return http.get(request.url, () => {
    return HttpResponse.json(request.data())
  })
})
