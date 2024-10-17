import { useSideBar } from './use-side-bar'
import { describe, expect, it } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const setupHook = () => {
  const queryClient = new QueryClient()

  return renderHook(useSideBar, {
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

    const callback = result.current.onChangeActiveBoard('yu931')
    callback()

    await waitFor(() => {
      expect(result.current.activeBoardId).toEqual('yu931')
    })
  })
})
