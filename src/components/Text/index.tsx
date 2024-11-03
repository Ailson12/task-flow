import { colors } from '@/styles/colors'
import { pxToRem } from '@/helpers/px-to-rem'
import { CSSProperties, FC, ReactNode, useMemo } from 'react'

type Props = CSSProperties & {
  children: ReactNode
  size?: number | string
  weight?: number
  color?: string
  spacing?: number
}

const validUnits = [
  'px',
  'rem',
  'em',
  '%',
  'vw',
  'vh',
  'vmin',
  'vmax',
  'ch',
  'ex',
  'pt',
  'pc',
  'in',
  'cm',
  'mm',
]

const FONT_SIZE_DEFAULT = 16

export const Text: FC<Props> = ({
  children,
  color = colors.c4,
  weight = 400,
  spacing,
  size = FONT_SIZE_DEFAULT,
  ...props
}) => {
  const sizeIsText = typeof size === 'string'

  const isValidSize = () => {
    if (sizeIsText) {
      const unit = size.replace(/\d/g, '')
      return validUnits.includes(unit)
    }

    return true
  }

  const validSize = useMemo(() => {
    if (isValidSize()) {
      return sizeIsText ? size : pxToRem(size)
    }

    console.error('font-size is invalid!')
    return FONT_SIZE_DEFAULT
  }, [size])

  return (
    <p
      style={{
        color,
        fontWeight: weight,
        letterSpacing: spacing,
        fontSize: validSize,
        ...props,
      }}
    >
      {children}
    </p>
  )
}
