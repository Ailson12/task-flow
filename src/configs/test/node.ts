import { setupServer } from 'msw/node'
import { boardServiceMock } from '@/mocks/board-service-mock'
import { taskStatusServiceMock } from '@/mocks/task-status-mock'
import { taskServiceMock } from '@/mocks/task-mock'

const handlers = [
  ...taskServiceMock,
  ...boardServiceMock,
  ...taskStatusServiceMock,
]

export const server = setupServer(...handlers)
