import { ViewTask } from './index'
import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { useState } from 'react'

describe('<ViewTask />', () => {
  it('should display the title and description of the selected task', () => {
    const ComponentWithState = () => {
      const [open, setOpen] = useState(true)

      return (
        <ViewTask
          open={open}
          onClose={() => setOpen(false)}
          task={{
            id: 1,
            title: 'Criar página inicial do site',
            order: 1,
            taskStatus: {
              id: 1,
              title: 'A fazer',
            },
            description:
              'Planejar e desenvolver a interface inicial do site, com foco em usabilidade e design responsivo.',
          }}
        />
      )
    }

    render(<ComponentWithState />)

    const header = screen.getByRole('banner')
    const title = within(header).queryByText('Criar página inicial do site')
    expect(title).not.toBeNull()

    const description = screen.queryByText(
      'Planejar e desenvolver a interface inicial do site, com foco em usabilidade e design responsivo.'
    )
    expect(description).not.toBeNull()
  })
})
