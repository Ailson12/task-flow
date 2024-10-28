import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { OptionSelectType, Select } from './index'
import { useState } from 'react'

const getOptionsWithoutDefault = (options: HTMLOptionElement[]) => {
  return options.filter((option) => !/selecione/i.test(option.text))
}

describe('<Select />', () => {
  it('should render the label', () => {
    render(<Select label="Customer" options={[]} />)

    const label = screen.queryByText('Customer')
    expect(label).toBeDefined()
  })

  it('should render a default option with an empty value', () => {
    render(<Select label="Customer" options={[]} />)

    const options = screen.queryAllByRole<HTMLOptionElement>('option')
    expect(options).toHaveLength(1)

    const defaultOption = options[0]
    expect(defaultOption.value).toBe('')
    expect(defaultOption.text).toBe('Selecione...')
  })

  it('should render the options correctly', () => {
    const customers: OptionSelectType[] = [
      {
        label: 'ITA',
        value: 'ita',
      },
      {
        label: 'ABHY',
        value: 'abhy',
      },
    ]
    render(<Select label="Customer" options={customers} />)

    const options = getOptionsWithoutDefault(
      screen.queryAllByRole<HTMLOptionElement>('option')
    )
    expect(options).toHaveLength(2)

    const firstOption = options[0]
    expect(firstOption.value).toBe(customers[0].value)
    expect(firstOption.text).toBe(customers[0].label)

    const secondOption = options[1]
    expect(secondOption.value).toBe(customers[1].value)
    expect(secondOption.text).toBe(customers[1].label)
  })

  it('should alert in the terminal if you have duplicate options', () => {
    const customers: OptionSelectType[] = [
      {
        label: 'ITA',
        value: 'ita',
      },
      {
        label: 'ABHY',
        value: 'ita',
      },
    ]

    const consoleMock = vi.spyOn(console, 'error')
    render(<Select label="Customer" options={customers} />)

    expect(consoleMock).toHaveBeenCalledTimes(1)
    expect(consoleMock).toHaveBeenCalledWith('duplicate options')
  })

  it('should not display the options if there is a duplicate value', () => {
    const customers: OptionSelectType[] = [
      {
        label: 'ITA',
        value: 'ita',
      },
      {
        label: 'ABHY',
        value: 'ita',
      },
    ]

    render(<Select label="Customer" options={customers} />)

    const options = getOptionsWithoutDefault(screen.queryAllByRole('option'))
    expect(options).toHaveLength(0)
  })

  it('should set the value when the user selects an option', () => {
    const SelectWithState = () => {
      const [value, setValue] = useState('')
      const books: OptionSelectType[] = [
        {
          label: 'MONE IS TIME',
          value: 'mone-is-time',
        },
        {
          label: 'LOVE MUSIC',
          value: 'love-music',
        },
      ]

      return (
        <Select
          selectOptions={{
            value,
            onChange: ({ target }) => setValue(target.value),
          }}
          label="Book"
          options={books}
        />
      )
    }

    render(<SelectWithState />)

    const select = screen.getByRole<HTMLSelectElement>('combobox')
    expect(select.value).toHaveLength(0)

    fireEvent.change(select, {
      target: {
        value: 'love-music',
      },
    })
    expect(select.value).toBe('love-music')
  })
})
