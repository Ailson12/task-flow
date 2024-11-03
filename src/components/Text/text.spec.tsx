import { Text } from './index'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

const getFontSizeByElement = (element: HTMLElement) => {
  return element.style.getPropertyValue('font-size')
}

describe('<Text />', () => {
  it('should display the text provided between the component tags', () => {
    render(<Text>content</Text>)

    const text = screen.queryByText('content')
    expect(text).toBeTruthy()
    expect(text?.textContent).toEqual('content')
  })

  it('should accept fontSize as a number and convert to rem', () => {
    const SIZE = 22

    render(<Text size={SIZE}>Lorem ipsum dolor sit amet.</Text>)
    const text = screen.getByText(/lorem ipsum/i)
    const fontSize = text.style.getPropertyValue('font-size')

    // check is rem
    expect(fontSize).toEqual(expect.stringContaining('rem'))
    // check if it converted correctly
    expect(`${SIZE / 16}rem`).toStrictEqual(fontSize)
  })

  it('should accept other units of measurement if passed as a string', () => {
    const sizes = {
      ch: '22ch',
      percentage: '22%',
    }

    render(<Text size={sizes.ch}>Text in CH.</Text>)
    render(<Text size={sizes.percentage}>Text in percentage.</Text>)

    const textCh = screen.getByText('Text in CH.')
    const fontSizeCh = getFontSizeByElement(textCh)
    expect(fontSizeCh).toStrictEqual('22ch')

    const textPercentage = screen.getByText('Text in percentage.')
    const fontSizePercentage = getFontSizeByElement(textPercentage)
    expect(fontSizePercentage).toStrictEqual('22%')
  })

  it('should trigger an error in the console if the unit size is invalid', () => {
    const consoleMock = vi.spyOn(console, 'error')
    render(<Text size={'22ABC'}>My soup is delicious</Text>)

    expect(consoleMock).toHaveBeenCalledTimes(1)
    expect(consoleMock).toHaveBeenCalledWith('font-size is invalid!')
    consoleMock.mockClear()
  })

  it('should set fontSize to 16 if the unit is invalid', () => {
    render(<Text size={'22--'}>Thanks, goodbye!</Text>)

    const text = screen.getByText('Thanks, goodbye!')
    const fontSize = getFontSizeByElement(text)
    const onlyNumber = +fontSize.replace(/\D/g, '')

    expect(onlyNumber).toBe(16)
  })
})
