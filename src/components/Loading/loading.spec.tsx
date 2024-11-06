import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Loading } from './index'
import { generateUUID } from '@/helpers/generate-uuid'

describe('<Loading />', () => {
  it('should render the load if the isVisible property is equal to true', () => {
    const testId = generateUUID()
    render(
      <Loading
        isVisible={true}
        spanProps={{
          'data-testid': testId,
        }}
      />
    )

    const loadingWrapper = screen.queryByTestId(testId)
    expect(loadingWrapper).toBeTruthy()
  })

  it('should not return the load if the isVisible property is false', () => {
    const testId = generateUUID()
    render(
      <Loading
        isVisible={false}
        spanProps={{
          'data-testid': testId,
        }}
      />
    )

    const loadingWrapper = screen.queryByTestId(testId)
    expect(loadingWrapper).toBeNull()
  })
})
