import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const ChipWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  color: '#e9e4e4',
  background: colors.c6,
  fontSize: 13,
  width: 'max-content',
  borderRadius: 10,
  padding: '6px 12px',
})

export const ChipCloseWrapper = styled.button({
  padding: 1,
  display: 'flex',
  borderRadius: '100%',
  background: colors.c1,
})
