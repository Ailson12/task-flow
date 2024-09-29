import { useSideBar } from './use-side-bar'
import { describe, expect, it } from 'vitest'
import { BoardService } from '@/services/board/board'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const boardServiceMock: BoardService = {
  findAll() {
    return Promise.resolve([
      {
        id: 'ab123',
        name: 'Marketing',
      },
      {
        id: 'yu931',
        name: 'RoadMap',
      },
    ])
  },
}

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
    await waitFor(callback)

    expect(result.current.activeBoardId).toEqual('yu931')
  })
})
