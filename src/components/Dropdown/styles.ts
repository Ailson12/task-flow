import styled from 'styled-components'
import { colors } from '@/styles/colors'
import { pxToRem } from '@/helpers/px-to-rem'

export const DropdownWrapper = styled.div({
  position: 'relative',
  display: 'flex',
  '& button': {
    zIndex: 10,
    position: 'inherit',
    background: 'inherit',
  },
  '& img': {
    display: 'flex',
    cursor: 'pointer',
  },
})

export const DropdownList = styled.ul({
  position: 'absolute',
  display: 'flex',
  right: 0,
  flexDirection: 'column',
  zIndex: 15,
  top: 'calc(100% + 4px)',
  background: colors.c3,
  minWidth: pxToRem(100),
  borderRadius: pxToRem(4),
  border: `1px solid ${colors.c2}`,
  '& li + li': {
    borderTop: `1px solid ${colors.c2}`,
  },
})

export const DropdownListItem = styled.li({
  textWrap: 'nowrap',
  padding: `${pxToRem(6)} ${pxToRem(12)}`,
  cursor: 'pointer',
  color: '#d5cfcf',
  letterSpacing: 1,
  minWidth: pxToRem(120),
})

export const DropdownBackground = styled.div<{
  $isVisible: boolean
}>(({ $isVisible }) => ({
  position: 'fixed',
  top: 0,
  display: $isVisible ? 'flex' : 'none',
  height: '100%',
  width: '100%',
  left: 0,
  zIndex: 5,
}))
