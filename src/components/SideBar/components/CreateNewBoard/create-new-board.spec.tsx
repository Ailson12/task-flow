import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CreateNewBoard } from './index'
import { setupWithDefaultProvider } from '@/helpers/setup-render'

const setupRender = () => {
  const component = setupWithDefaultProvider(<CreateNewBoard />)
  return render(component)
}

describe('<CreateNewBoard />', () => {
  it('should start with the dialog closed', () => {
    setupRender()

    const dialog = screen.queryByRole('dialog')
    expect(dialog).toBeNull()
  })

  it('should open the dialog when you click on "criar novo quadro"', () => {
    setupRender()

    // open dialog
    const controlDialog = screen.getByText(/criar novo quadro/i)
    fireEvent.click(controlDialog)

    const dialog = screen.queryByRole('dialog')
    expect(dialog).toBeTruthy()
  })

  it('should display the title "adicionar novo quadro" in the dialog', () => {
    setupRender()

    // open dialog
    const controlDialog = screen.getByText(/criar novo quadro/i)
    fireEvent.click(controlDialog)

    const title = screen.queryByText(/adicionar novo quadro/i)
    expect(title).toBeTruthy()
  })

  it('should display the name, description and status fields', () => {
    setupRender()

    // open dialog
    const controlDialog = screen.getByText(/criar novo quadro/i)
    fireEvent.click(controlDialog)

    const inputName = screen.getByLabelText('Título')
    const inputDescription = screen.queryByLabelText('Descrição')

    const selectStatus = screen.queryByRole<HTMLSelectElement>('combobox')

    expect(inputName).toBeTruthy()
    expect(inputDescription).toBeTruthy()
    expect(selectStatus).toBeTruthy()
  })

  it('should display a save button', () => {
    setupRender()

    // open dialog
    const controlDialog = screen.getByText(/criar novo quadro/i)
    fireEvent.click(controlDialog)

    const saveButton = screen.queryByRole('button', {
      name: 'Salvar',
    })

    expect(saveButton).toBeTruthy()
  })
})
