import { Dropdown } from './index'
import { describe, expect, it, vi } from 'vitest'
import { DropdownItem } from './hooks/useDropdown'
import { fireEvent, render, screen } from '@testing-library/react'

const options: DropdownItem[] = [
  {
    key: 'edit',
    label: 'Editar',
    onClick: console.log,
  },
]

const onClickMoreActions = async () => {
  const icon = screen.getByRole('img')
  fireEvent.click(icon)
}

describe('<Dropdown />', () => {
  it('should start with empty options', () => {
    render(<Dropdown items={options} />)

    const optionList = screen.queryAllByRole('list')
    expect(optionList).toHaveLength(0)
  })

  it('should list the options when you click on the more actions icon', async () => {
    render(<Dropdown items={options} />)

    await onClickMoreActions()

    const optionList = screen.queryAllByRole('list')
    expect(optionList).toHaveLength(1)
  })

  it('should close the options if you click outside the dropdown', async () => {
    render(<Dropdown items={options} />)
    await onClickMoreActions()

    const bgDropdown = screen.getByTestId('bg-dropdown')
    fireEvent.click(bgDropdown)

    const optionList = screen.queryAllByRole('list')
    expect(optionList).toHaveLength(0)
  })

  it('should callback when clicking on an option', async () => {
    const onCallback = vi.fn()

    render(
      <Dropdown
        items={[
          {
            key: 'edit',
            label: 'Editar',
            onClick: onCallback,
          },
        ]}
      />
    )

    await onClickMoreActions()

    const firstOption = screen.getByRole('listitem')
    fireEvent.click(firstOption)

    expect(onCallback).toHaveBeenCalledTimes(1)
  })
})
