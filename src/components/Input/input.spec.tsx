import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Input } from './index'
import { useState } from 'react'

const InputWithState = () => {
  const [value, setValue] = useState('')
  return (
    <Input
      label="Name"
      inputProps={{
        value,
        name: 'name',
        onChange: ({ target }) => setValue(target.value),
      }}
    />
  )
}

describe('<Input />', () => {
  it('should render the label ', () => {
    render(<InputWithState />)

    const label = screen.queryByText('Name')
    expect(label).toBeDefined()
  })

  it('should write to the input when the user types', () => {
    render(<InputWithState />)

    const input = screen.getByRole<HTMLInputElement>('textbox')
    expect(input.value).toHaveLength(0)

    fireEvent.change(input, {
      target: {
        value: 'pedro matheus',
      },
    })
    expect(input.value).toBe('pedro matheus')
  })

  it('should display an error message below the input', () => {
    render(
      <Input
        errorMessage="Required field"
        label="Name"
        inputProps={{
          name: 'name',
        }}
      />
    )

    const errorMessageText = screen.queryByText(/required field/i)
    expect(errorMessageText).toBeTruthy()
    expect(errorMessageText?.getAttribute('aria-hidden')).toEqual('false')
  })

  it('should hide the error paragraph if the message is empty', () => {
    render(
      <Input
        errorMessage=""
        label="Name"
        inputProps={{
          name: 'name',
        }}
      />
    )

    const errorMessage = screen.queryByRole('paragraph')
    expect(errorMessage).toBeNull()
  })
})
