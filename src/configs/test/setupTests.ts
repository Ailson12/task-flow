import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from '@/configs/test/node'
import { cleanup } from '@testing-library/react'

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  // ensures that it cleans the DOM with each test suite
  cleanup()
})
afterAll(() => server.close())
