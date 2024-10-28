import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const Label = styled.div({
  color: colors.c4,
  letterSpacing: 1,
  fontSize: 13,
  display: 'block',
})

export const SelectWrapper = styled.select({
  width: '100%',
  padding: 8,
  outline: 0,
  borderRadius: 4,
  color: colors.c4,
  border: `2px solid ${colors.c5}`,
  background: colors.c3,
})
