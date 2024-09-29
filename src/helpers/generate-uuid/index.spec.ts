import { describe, expect, it } from 'vitest'
import { generateUUID } from '.'

describe('Generate UUID', () => {
  it('function should return something', () => {
    expect(generateUUID()).toBeDefined()
  })

  it('should return letters and numbers', () => {
    const value = generateUUID()
    expect(value).toMatch(/(\D)(\d)/)
  })

  it('should return 36 characters', () => {
    const value = generateUUID()
    expect(value).toHaveLength(36)
  })
})
