import { DialogHeader } from './index'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('<DialogHeader />', () => {
  it('should display the title if provided', () => {
    render(<DialogHeader title="Title x" />)

    const title = screen.queryByText('Title x')
    expect(title).toBeTruthy()
  })

  it('should display a button to close the dialog', () => {
    render(<DialogHeader title="Title x" />)

    const buttonClose = screen.queryByRole('button', {
      name: /fechar/i,
    })

    expect(buttonClose).toBeTruthy()
  })

  it('should accept a child element in place of the title', () => {
    render(
      <DialogHeader>
        <p data-testid="title-custom">Title custom</p>
      </DialogHeader>
    )

    const child = screen.queryByTestId('title-custom')
    expect(child).toBeTruthy()
  })

  it('should throw an error in the console if it receives title and child', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error')

    render(
      <DialogHeader title="Title custom x">
        <p data-testid="title-custom">Title custom</p>
      </DialogHeader>
    )

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'property title and children cannot be entered together'
    )
  })
})
