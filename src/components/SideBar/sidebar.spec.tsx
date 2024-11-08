import {
  render,
  screen,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { SideBar } from './index'
import { describe, expect, it } from 'vitest'
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

  it('should display a loading while searching for boards', () => {
    setupRender()
    const loader = screen.queryByTestId('sidebar-loader')
    expect(loader).toBeTruthy()
  })

  it('should show a load while the data is loaded and then disappear when finished', async () => {
    setupRender()

    const loader = screen.queryByTestId('sidebar-loader')
    expect(loader).toBeTruthy()

    await waitForElementToBeRemoved(loader)
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

  it('should close the sidebar when the logo is clicked', () => {
    setupRender()

    const sidebarWrapper = screen.queryByRole('complementary')

    // check it's open
    const ariaHidden = sidebarWrapper?.getAttribute('aria-hidden')
    expect(ariaHidden).toEqual('false')

    // close sidebar
    const logoHeader = screen.getByRole('banner')
    fireEvent.click(logoHeader)

    // check it's closed
    const ariaHidden2 = sidebarWrapper?.getAttribute('aria-hidden')
    expect(ariaHidden2).toEqual('true')
  })
})
