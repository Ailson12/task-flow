import { setupServer } from 'msw/node'
import { boardServiceMock } from '@/mocks/board-service-mock'

const handlers = [...boardServiceMock]

export const server = setupServer(...handlers)
