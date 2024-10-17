import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from '@/configs/test/node'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
