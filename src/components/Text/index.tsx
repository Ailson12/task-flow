import { colors } from '@/styles/colors'
import { CSSProperties, FC, ReactNode } from 'react'

type Props = CSSProperties & {
  children: ReactNode
  size?: number | string
  weight?: number
  color?: string
  spacing?: number
}

export const Text: FC<Props> = ({
  children,
  color = colors.c4,
  weight = 400,
  spacing,
  size = 16,
  ...props
}) => {
  const sizeComputed = typeof size === 'string' ? size : `${size / 16}rem`

  return (
    <p
      style={{
        color,
        fontWeight: weight,
        letterSpacing: spacing,
        fontSize: sizeComputed,
        ...props,
      }}
    >
      {children}
    </p>
  )
}
