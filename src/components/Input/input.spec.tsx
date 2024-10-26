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
})
