import styled from 'styled-components'
import { colors } from '@/styles/colors'
import { ButtonProps } from './index'

export const ButtonWrapper = styled.button<{
  $variant?: ButtonProps['variant']
}>(
  {
    background: colors.c1,
    color: colors.c4,
    fontSize: 16,
    padding: '0.70rem 1.5rem',
    cursor: 'pointer',
    letterSpacing: 1,
    lineHeight: 1,
    height: '100%',
    borderRadius: '1.5rem',
    fontWeight: 600,
  },
  ({ $variant }) => ({
    ...($variant === 'secondary' && {
      color: colors.c1,
      background: colors.c4,
    }),
  })
)
