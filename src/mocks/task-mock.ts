import { Task } from '@/types/task'
import { http, HttpResponse } from 'msw'

const requests = [
  {
    url: `${import.meta.env.VITE_API_URL}task/board`,
    method: 'findAllByBoard',
    data: () => {
      return [
        {
          id: 1,
          description: '',
          order: 0,
          taskStatus: {
            id: 1,
            title: 'Done',
          },
          title: 'Task 01',
        },
        {
          id: 2,
          description: '',
          order: 1,
          taskStatus: {
            id: 2,
            title: 'Pending',
          },
          title: 'Task 02',
        },
      ] satisfies Task[]
    },
  },
]

export const taskServiceMock = requests.map((request) => {
  return http.get(request.url, () => {
    return HttpResponse.json(request.data())
  })
})
