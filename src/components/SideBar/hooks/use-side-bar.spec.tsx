import { useSideBar } from './use-side-bar'
import { describe, expect, it } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { boardServiceMock } from '@/mocks/board-service-mock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const setupHook = () => {
  const queryClient = new QueryClient()

  const hook = () => {
    return useSideBar({
      boardService: boardServiceMock,
    })
  }

  return renderHook(hook, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  })
}

describe('useSideBar', () => {
  it('should start empty boards', () => {
    const { result } = setupHook()
    expect(result.current.board.items).toHaveLength(0)
  })

  it('should get the boards', async () => {
    const { result } = setupHook()
    await waitFor(() => result.current.board.isLoading)
    expect(result.current.board.items).toHaveLength(2)
  })

  it('should set the active board', async () => {
    const { result } = setupHook()

    const callback = result.current.onChangeActiveBoard('yu931')
    callback()

    await waitFor(() => {
      expect(result.current.activeBoardId).toEqual('yu931')
    })
  })
})
