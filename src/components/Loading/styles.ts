import styled from 'styled-components'
import { colors } from '@/styles/colors'

export const LoadingWrapper = styled.span({
  width: '4rem',
  height: '4rem',
  borderRadius: '50%',
  display: 'flex',
  margin: '2rem auto',
  position: 'relative',
  boxSizing: 'border-box',
  animation: 'rotation 1s linear infinite',
  border: `3px solid ${colors.c1}`,
  '&:after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    boxSizing: 'border-box',
    border: '3px solid',
    borderColor: `${colors.c1} transparent`,
  },
  '@keyframes rotation': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
})
