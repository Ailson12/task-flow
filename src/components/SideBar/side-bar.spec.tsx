import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SideBar } from './index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

describe('<SideBar />', () => {
  it('should display the logo and name of the application', () => {
    render(<SideBar />, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    const logo = screen.queryByAltText('logo')
    const title = screen.queryByText('TaskFlow')

    expect(logo).toBeTruthy()
    expect(title).toBeTruthy()
  })

  it('should display the total number of boards registered', async () => {
    render(<SideBar />, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    await waitFor(async () => {
      const { textContent = '' } = await screen.findByText(/todos quadros/i)
      const total = Number(textContent?.replace(/\D/g, ''))
      expect(total).toBe(2)
    })
  })
})
