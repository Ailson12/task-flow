import { pxToRem } from '@/helpers/px-to-rem'
import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const Container = styled.nav({
  padding: '1.5rem',
  display: 'flex',
  gap: pxToRem(8),
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  alignItems: 'center',
  height: 'max-content',
  background: colors.c3,
  borderBottom: `1px solid ${colors.c5}`,
})

export const SidebarControl = styled.div({
  display: 'flex',
  gap: pxToRem(8),
})
