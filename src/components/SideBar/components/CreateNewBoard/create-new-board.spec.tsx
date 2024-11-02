import { CreateNewBoard } from './index'
import { describe, expect, it } from 'vitest'
import { setupWithDefaultProvider } from '@/helpers/setup-render'
import { getOptionsWithoutDefault } from '@/components/Select/select.spec'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

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

  it('should select a status and add it to the list', async () => {
    setupRender()

    // open dialog
    const controlDialog = screen.getByText(/criar novo quadro/i)
    fireEvent.click(controlDialog)

    await waitFor(() => {
      const options = getOptionsWithoutDefault(screen.queryAllByRole('option'))
      expect(options).toHaveLength(2)
    })

    // select first status
    const select = screen.getByRole<HTMLSelectElement>('combobox')
    fireEvent.change(select, {
      target: {
        value: '1',
      },
    })

    // add status to list
    const buttonAddStatus = screen.getByRole('button', {
      name: 'Adicionar',
    })
    fireEvent.click(buttonAddStatus)

    // check list status
    const dialog = screen.getByRole('dialog')
    const statusList = dialog.querySelectorAll('li')

    expect(statusList).toHaveLength(1)
  })

  it('should remove a status when you click on the "X" next to the label', async () => {
    setupRender()

    // open dialog
    const controlDialog = screen.getByText(/criar novo quadro/i)
    fireEvent.click(controlDialog)

    await waitFor(() => {
      const options = getOptionsWithoutDefault(screen.queryAllByRole('option'))
      expect(options).toHaveLength(2)
    })

    // select first status
    const select = screen.getByRole<HTMLSelectElement>('combobox')
    fireEvent.change(select, {
      target: {
        value: '1',
      },
    })

    // add status to list
    const buttonAddStatus = screen.getByRole('button', {
      name: 'Adicionar',
    })
    fireEvent.click(buttonAddStatus)

    // check status add
    const dialog = screen.getByRole('dialog')
    const getStatusList = () => dialog.querySelectorAll('li')

    expect(getStatusList()).toHaveLength(1)

    // remove status
    const removeButton = screen.getByRole('button', {
      name: 'Remover status',
    })
    fireEvent.click(removeButton)

    expect(getStatusList()).toHaveLength(0)
  })
})
