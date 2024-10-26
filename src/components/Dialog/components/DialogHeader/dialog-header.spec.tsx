import { DialogHeader, DialogHeaderProps } from './index'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

const setupRender = (params: Partial<DialogHeaderProps> = {}) => {
  const props = {
    onClose() {},
    ...params,
  }

  render(<DialogHeader {...props} />)
}

describe('<DialogHeader />', () => {
  it('should display the title if provided', () => {
    setupRender({
      title: 'Title x',
    })

    const title = screen.queryByText('Title x')
    expect(title).toBeTruthy()
  })

  it('should display a button to close the dialog', () => {
    setupRender({
      title: 'Title x',
    })

    const buttonClose = screen.queryByRole('button', {
      name: /fechar/i,
    })

    expect(buttonClose).toBeTruthy()
  })

  it('should accept a child element in place of the title', () => {
    setupRender({
      children: <p data-testid="title-custom">Title custom</p>,
    })

    const child = screen.queryByTestId('title-custom')
    expect(child).toBeTruthy()
  })

  it('should throw an error in the console if it receives title and child', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error')

    setupRender({
      title: 'Title custom x',
      children: <p data-testid="title-custom">Title custom</p>,
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'property title and children cannot be entered together'
    )
    consoleErrorSpy.mockClear()
  })

  it('should execute the callback when you click to close', () => {
    const handleClick = vi.fn()

    setupRender({
      title: 'Title custom x',
      onClose: handleClick,
    })

    const buttonClose = screen.getByRole('button', {
      name: /fechar/i,
    })

    fireEvent.click(buttonClose)

    expect(handleClick).toHaveBeenCalledTimes(1)
    handleClick.mockClear()
  })
})
