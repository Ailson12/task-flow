import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TextArea } from './index'
import { useState } from 'react'

const TextAreaWithState = () => {
  const [value, setValue] = useState('')
  return (
    <TextArea
      label="Description"
      textAreaProps={{
        value,
        onChange: ({ target }) => setValue(target.value),
      }}
    />
  )
}

describe('<TextArea />', () => {
  it('should render the label ', () => {
    render(<TextAreaWithState />)

    const label = screen.queryByText('Description')
    expect(label).toBeDefined()
  })

  it('should write to the textarea when the user types', () => {
    render(<TextAreaWithState />)

    const textarea = screen.getByRole<HTMLInputElement>('textbox')
    expect(textarea.value).toHaveLength(0)

    fireEvent.change(textarea, {
      target: {
        value: 'task description',
      },
    })
    expect(textarea.value).toBe('task description')
  })
})
