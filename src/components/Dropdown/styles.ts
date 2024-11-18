import styled from 'styled-components'
import { colors } from '@/styles/colors'
import { pxToRem } from '@/helpers/px-to-rem'

export const DropdownWrapper = styled.div({
  position: 'relative',
  '& button': {
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
  zIndex: 10,
  top: 'calc(100% + 4px)',
  background: colors.c6,
  minWidth: pxToRem(100),
  borderRadius: pxToRem(4),
  border: '1px solid #655ec8',
  '& li + li': {
    borderTop: '1px solid #655ec8',
  },
})

export const DropdownListItem = styled.li({
  textWrap: 'nowrap',
  padding: `${pxToRem(6)} ${pxToRem(12)}`,
  cursor: 'pointer',
  color: '#d5cfcf',
})
