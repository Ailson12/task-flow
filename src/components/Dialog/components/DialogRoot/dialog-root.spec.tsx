import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DialogRoot, DialogRootProps } from './index'

const setupRender = (props: Partial<DialogRootProps> = {}) => {
  return render(
    <DialogRoot open={props.open ?? true}>
      <div>content x</div>
    </DialogRoot>
  )
}

describe('<DialogRoot />', () => {
  it('should display the child when open is true', () => {
    setupRender({ open: true })
    const children = screen.queryByText(/content/i)
    expect(children).toBeTruthy()
  })

  it('should hide the child when open is false', () => {
    setupRender({ open: false })
    const children = screen.queryByText(/content/i)

    expect(children).toBeNull()
    expect(children).toBeFalsy()
  })
})
