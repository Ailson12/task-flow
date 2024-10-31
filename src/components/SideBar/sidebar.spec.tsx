import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SideBar } from './index'
import { setupWithDefaultProvider } from '@/helpers/setup-render'

const setupRender = () => {
  const component = setupWithDefaultProvider(<SideBar />)
  return render(component)
}

const getNumberFromText = (value?: string | null) => {
  const onlyNumber = (value ?? '')?.replace(/\D/g, '')
  return Number(onlyNumber)
}

describe('<Sidebar/>', () => {
  it('should display the logo and name of the application', () => {
    setupRender()

    const logo = screen.queryByAltText('logo')
    const title = screen.queryByText('TaskFlow')

    expect(logo).toBeTruthy()
    expect(title).toBeTruthy()
  })

  it('should display the total number of zeroed boards initially', () => {
    setupRender()

    const { textContent } = screen.queryByText(/todos quadros/i) ?? {}
    const total = getNumberFromText(textContent)
    expect(total).toBe(0)
  })

  it('should show the total number of boards after making the request', async () => {
    setupRender()

    await waitFor(() => {
      const { textContent } = screen.queryByText(/todos quadros/i) ?? {}
      const total = getNumberFromText(textContent)
      expect(total).toBe(2)
    })
  })

  it('should display a list of the boards', async () => {
    setupRender()

    await waitFor(() => {
      const boards = screen.getAllByRole('listitem')

      const TOTAL_BOARDS = 2
      const ACTION_NEW_BOARD = 1
      const LENGTH_EXPERIENCED = TOTAL_BOARDS + ACTION_NEW_BOARD
      expect(boards).toHaveLength(LENGTH_EXPERIENCED)

      const names = boards.map((board) => board.textContent ?? '')
      expect(names).toEqual(expect.arrayContaining(['RoadMap', 'Marketing']))
    })
  })

  it('should display the option to register a board', () => {
    setupRender()

    const actionNewBoard = screen.queryByText('criar novo quadro', {
      exact: false,
    })

    expect(actionNewBoard).toBeTruthy()
  })
})
