import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const InputWrapper = styled.div({
  width: '100%',
})

export const Label = styled.label({
  color: colors.c4,
  letterSpacing: 1,
  fontSize: 14,
  display: 'block',
})

export const Input = styled.input({
  width: '100%',
  padding: 8,
  outline: 0,
  borderRadius: 4,
  color: colors.c4,
  border: `2px solid ${colors.c5}`,
  background: colors.c3,
})
