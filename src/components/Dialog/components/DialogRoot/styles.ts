import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const DialogWrapper = styled.dialog({
  '&[open]': {
    position: 'fixed',
    padding: 10,
    border: 0,
    height: '100%',
    width: '100%',
    zIndex: 10,
    left: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'rgba(0, 0, 0, 0.20)',
  },
})

export const DialogContent = styled.div({
  background: '#2c2c38',
  width: '100%',
  maxWidth: 550,
  padding: '1rem',
  borderRadius: 4,
  border: `3px solid ${colors.c5}`,
})
