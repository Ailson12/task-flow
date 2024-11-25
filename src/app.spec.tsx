import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'
import { setupWithDefaultProvider } from './helpers/setup-render'

describe('<App />', () => {
  it('should display the first board by default', async () => {
    render(setupWithDefaultProvider(<App />))

    await waitFor(() => {
      // await get boards
      const boards = screen.getAllByRole('listitem')
      expect(boards).toHaveLength(3)

      const firstBoard = screen.getAllByText('Marketing')
      expect(firstBoard).toHaveLength(2)
    })
  })

  it('should select a board in the sidebar and display it in the navbar', async () => {
    render(setupWithDefaultProvider(<App />))

    await waitFor(() => {
      // await get boards
      const boards = screen.getAllByRole('listitem')
      expect(boards).toHaveLength(3)

      const navbar = screen.queryByRole('navigation')
      const titleNavbar = navbar?.querySelector('p')

      // select board
      const boardSelected = screen.getByText('RoadMap')
      fireEvent.click(boardSelected)

      expect(titleNavbar?.textContent).toContain('RoadMap')
    })
  })
})
