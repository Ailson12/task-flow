import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { SidebarLink, SidebarLinkProps } from './index'

type Params = {
  props?: Partial<SidebarLinkProps>
}

const makeComponent = (params: Params = {}) => {
  const props = {
    title: 'Board x',
    ...params.props,
  }

  const component = <SidebarLink {...props} />

  return {
    props,
    component,
  }
}

describe('<SideBarLink />', () => {
  it('should mount the component', () => {
    const { component } = makeComponent()
    render(component)
  })

  it('should display the title', () => {
    const { component, props } = makeComponent()
    render(component)

    const title = screen.queryByText(/board x/i)
    expect(title?.textContent).toEqual(props.title)
  })

  it('should display a board icon', () => {
    const { component } = makeComponent()
    const { container } = render(component)
    const icon = container.querySelector('svg')
    expect(icon).toBeTruthy()
  })

  it('should execute the callback when you click on the link', async () => {
    const handleClick = vi.fn()
    const { component } = makeComponent({
      props: { onClick: handleClick },
    })

    render(component)

    const title = await screen.findByText(/board x/i)
    fireEvent.click(title)

    expect(handleClick).toHaveBeenCalledTimes(1)
    handleClick.mockClear()
  })
})
