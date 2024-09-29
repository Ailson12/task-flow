import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const Container = styled.div<{
  $isActive: boolean
}>(
  {
    display: 'flex',
    gap: '0.5rem',
    padding: '8px 0',
    marginBottom: 4,
    position: 'relative',
    zIndex: 1,
    cursor: 'pointer',
    '&::before': {
      height: '100%',
      width: '100%',
      top: 0,
      borderRadius: '0 1.5rem 1.5rem 0',
      zIndex: -1,
      right: '1.5rem',
      position: 'absolute',
      content: '""',
      display: 'flex',
    },
  },
  ({ $isActive }) => ({
    '&::before': {
      backgroundColor: $isActive ? colors.c1 : '',
    },
  })
)
