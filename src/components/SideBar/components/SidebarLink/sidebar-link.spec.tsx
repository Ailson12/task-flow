import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import { SidebarLink } from './index'

describe('<SideBarLink />', () => {
  it('should mount the component', () => {
    render(<SidebarLink title="Link 1" />)
  })
})
