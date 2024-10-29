import { setupServer } from 'msw/node'
import { boardServiceMock } from '@/mocks/board-service-mock'
import { taskStatusServiceMock } from '@/mocks/task-status-mock'

const handlers = [...boardServiceMock, ...taskStatusServiceMock]

export const server = setupServer(...handlers)
