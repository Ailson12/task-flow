import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'
import { setupWithDefaultProvider } from './helpers/setup-render'

describe('<App />', () => {
  it('should select a board in the sidebar and display it in the navbar', async () => {
    render(setupWithDefaultProvider(<App />))

    // await get boards
    await waitFor(() => {
      const boards = screen.getAllByRole('listitem')
      expect(boards).toHaveLength(3)
    })

    // start empty
    const navbar = screen.queryByRole('navigation')
    const titleNavbar = navbar?.querySelector('p')

    expect(titleNavbar?.textContent).toContain('Quadro vazio')

    // select first board
    const firstBoard = screen.getByText('Marketing')
    fireEvent.click(firstBoard)

    expect(titleNavbar?.textContent).toContain('Marketing')
  })
})
