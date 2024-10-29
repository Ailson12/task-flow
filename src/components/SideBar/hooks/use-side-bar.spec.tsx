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

    const callback = result.current.onChangeActiveBoard(1)
    callback()

    await waitFor(() => {
      expect(result.current.activeBoardId).toEqual(1)
    })
  })

  it('should display an error when setting active board, if the value is not present in boards', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const INVALID_VALUE = 33

    const { result } = setupHook()
    const callback = result.current.onChangeActiveBoard(INVALID_VALUE)
    await waitFor(callback)

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `id ${INVALID_VALUE} is not included in the list of boards`
    )

    consoleErrorSpy.mockClear()
  })
})
