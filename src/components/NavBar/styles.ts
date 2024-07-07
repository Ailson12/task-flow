import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const Container = styled.nav({
  padding: '1.5rem',
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  height: 'max-content',
  background: colors.c3,
  borderBottom: `1px solid ${colors.c5}`,
})
