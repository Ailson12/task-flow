import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const HeaderWrapper = styled.header({
  display: 'flex',
  marginBottom: '1rem',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const ButtonClose = styled.button({
  display: 'flex',
  padding: 4,
  borderRadius: '100%',
  background: colors.c7,
})
