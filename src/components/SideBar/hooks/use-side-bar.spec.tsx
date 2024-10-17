import { useSideBar } from './use-side-bar'
import { describe, expect, it, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const setupHook = () => {
  const queryClient = new QueryClient()

  return renderHook(() => useSideBar(), {
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
    await waitFor(() => {
      expect(result.current.board.items).toHaveLength(2)
    })
  })

  it('should set the active board', async () => {
    const { result } = setupHook()

    await waitFor(() => {
      expect(result.current.board.isSuccess).toBe(true)
    })

    const callback = result.current.onChangeActiveBoard('yu931')
    callback()

    await waitFor(() => {
      expect(result.current.activeBoardId).toEqual('yu931')
    })
  })

  it('should display an error when setting active board, if the value is not present in boards', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const { result } = setupHook()
    const callback = result.current.onChangeActiveBoard('invalid-value')
    await waitFor(callback)

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'id invalid-value is not included in the list of boards'
    )

    consoleErrorSpy.mockClear()
  })
})
