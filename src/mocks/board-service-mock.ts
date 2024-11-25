import { Board } from '@/types/board'
import { http, HttpResponse } from 'msw'

type Method = keyof typeof http

const requests = [
  {
    url: `${import.meta.env.VITE_API_URL}board`,
    method: 'get' as Method,
    data: () => {
      return [
        {
          id: 1,
          taskStatusList: [],
          title: 'Marketing',
        },
        {
          id: 2,
          taskStatusList: [],
          title: 'RoadMap',
        },
      ] satisfies Board[]
    },
  },
  {
    url: `${import.meta.env.VITE_API_URL}board`,
    method: 'post' satisfies Method,
    data: () => {
      return null
    },
  },
]

export const boardServiceMock = requests.map((request) => {
  return http[request.method as Method](request.url, () => {
    return HttpResponse.json(request.data())
  })
})
