import { describe, expect, it } from 'vitest'
import { pxToRem } from '.'

describe('px to rem', () => {
  it('should divide the value by 16', () => {
    const value = pxToRem(33)
    const onlyNumber = Number(value.replace(/[^0-9.]/g, ''))

    expect(onlyNumber).toEqual(33 / 16)
  })

  it('should add the suffix "rem" to the end of the value', () => {
    const value = pxToRem(33)
    expect(value.endsWith('rem')).toBe(true)
  })
})
