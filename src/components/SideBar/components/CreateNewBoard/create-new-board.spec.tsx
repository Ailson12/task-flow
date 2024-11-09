import { toast } from 'react-toastify'
import { CreateNewBoard } from './index'
import { describe, expect, it, vi } from 'vitest'
import { setupWithDefaultProvider } from '@/helpers/setup-render'
import { getOptionsWithoutDefault } from '@/components/Select/select.spec'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const setupRender = () => {
  const component = setupWithDefaultProvider(<CreateNewBoard />)
  return render(component)
}

const openDialog = async () => {
  const controlDialog = screen.getByText(/criar novo quadro/i)
  fireEvent.click(controlDialog)
}

const clickSaveButton = async () => {
  return waitFor(() => {
    const saveButton = screen.getByRole('button', {
      name: 'Salvar',
    })
    fireEvent.click(saveButton)
  })
}

describe('<CreateNewBoard />', () => {
  it('should start with the dialog closed', () => {
    setupRender()

    const dialog = screen.queryByRole('dialog')
    expect(dialog).toBeNull()
  })

  it('should open the dialog when you click on "criar novo quadro"', async () => {
    setupRender()
    await openDialog()

    const dialog = screen.queryByRole('dialog')
    expect(dialog).toBeTruthy()
  })

  it('should display the title "adicionar novo quadro" in the dialog', async () => {
    setupRender()
    await openDialog()

    const title = screen.queryByText(/adicionar novo quadro/i)
    expect(title).toBeTruthy()
  })

  it('should display the name, description and status fields', async () => {
    setupRender()
    await openDialog()

    const inputName = screen.getByLabelText('Título')
    const inputDescription = screen.queryByLabelText('Descrição')

    const selectStatus = screen.queryByRole<HTMLSelectElement>('combobox')

    expect(inputName).toBeTruthy()
    expect(inputDescription).toBeTruthy()
    expect(selectStatus).toBeTruthy()
  })

  it('should display a save button', async () => {
    setupRender()
    await openDialog()

    const saveButton = screen.queryByRole('button', {
      name: 'Salvar',
    })

    expect(saveButton).toBeTruthy()
  })

  it('should select a status and add it to the list', async () => {
    setupRender()
    await openDialog()

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
    await openDialog()

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

  it('should display the validations to the user when they click the "save" button', async () => {
    setupRender()
    await openDialog()
    await clickSaveButton()

    // check title is required
    const titleField = screen.queryByText('Título')
    expect(titleField?.textContent).toContain('Campo obrigatório')

    // set large value in description
    const descriptionField = screen.getByRole('textbox', {
      name: /descrição/i,
    })
    fireEvent.change(descriptionField, {
      target: {
        value: 'x'.repeat(600),
      },
    })

    await clickSaveButton()

    // check max length description
    const descriptionLabel = screen.queryByText(/descrição/i)
    expect(descriptionLabel?.textContent).toContain(
      'Deve conter no máximo 500 caracteres'
    )
  })
})
