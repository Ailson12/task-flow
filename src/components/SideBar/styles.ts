import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const Wrapper = styled.aside<{
  $open?: boolean
}>(
  {
    background: colors.c3,
    width: 250,
    transition: '0.7s, opacity 1s',
    padding: '1.5rem',
    position: 'relative',
    borderRight: `1px solid ${colors.c5}`,
  },
  ({ $open }) => ({
    ...(!$open && {
      border: 0,
      overflow: 'hidden',
      width: 0,
      padding: 0,
      opacity: 0,
      transform: 'translate(-100%, 0)',
    }),
  })
)

export const SideBarHeader = styled.header({
  alignItems: 'center',
  cursor: 'pointer',
  gap: '0.5rem',
  display: 'flex',
  marginBottom: '2rem',
  '& h1': {
    letterSpacing: 1,
    color: colors.c4,
  },
})
