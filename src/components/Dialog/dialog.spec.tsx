import { describe, expect, it, vi } from 'vitest'
import { Dialog } from './index'
import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'

const DialogWithState = () => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  return (
    <>
      <Dialog.Root open={open}>
        <Dialog.Header title="Add new item" onClose={onClose} />
        <ul className="content-wrapper">
          <li>content 1</li>
          <li>content 2</li>
        </ul>
      </Dialog.Root>

      <button onClick={() => setOpen(true)}>open dialog</button>
    </>
  )
}

describe('<Dialog /> - INTEGRATION', () => {
  it('should assemble the dialog with their compositions', () => {
    const onClose = vi.fn()

    expect(() => {
      render(
        <Dialog.Root open={true}>
          <Dialog.Header title="Add new item" onClose={onClose} />
        </Dialog.Root>
      )
    }).not.throw()
    onClose.mockClear()
  })

  it('should render the content and header', () => {
    const onClose = vi.fn()
    render(
      <Dialog.Root open={true}>
        <Dialog.Header title="Add new item" onClose={onClose} />
        <ul className="content-wrapper">
          <li>content 1</li>
          <li>content 2</li>
        </ul>
      </Dialog.Root>
    )

    // render header
    const header = screen.queryByText('Add new item')
    expect(header).toBeTruthy()

    // render content
    const content = screen.queryByRole('list')
    expect(content).toBeTruthy()
  })

  it('should show and hide the dialog on button click', () => {
    render(<DialogWithState />)

    // starts with the dialog closed
    const initialDialog = screen.queryByRole('dialog')
    expect(initialDialog).toBeNull()

    // click in open dialog
    const openButton = screen.getByRole('button', {
      name: /open dialog/i,
    })
    fireEvent.click(openButton)

    // dialog is open
    const openDialog = screen.queryByRole('dialog')
    expect(openDialog).not.toBeNull()

    // click in close dialog
    const closeButton = screen.getByRole('button', {
      name: /fechar/i,
    })
    fireEvent.click(closeButton)

    // ends with the dialog closed
    const closeDialog = screen.queryByRole('dialog')
    expect(closeDialog).toBeNull()
  })
})
