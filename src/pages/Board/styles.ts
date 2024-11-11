import styled from 'styled-components'
import { colors } from '@/styles/colors'
import { pxToRem } from '@/helpers/px-to-rem'

export const Wrapper = styled.div({
  position: 'relative',
  height: '100%',
  overflow: 'auto',
})

export const Container = styled.div({
  display: 'flex',
  gap: '1.5rem',
  left: 0,
  bottom: 0,
  top: 0,
  right: 0,
  position: 'absolute',
})

export const StatusContainer = styled.div({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  flexWrap: 'wrap',
  position: 'sticky',
  top: 0,
  minWidth: pxToRem(190),
  background: colors.c6,
  paddingBottom: '1rem',
})

export const StatusIndicator = styled.div<{
  $bgColor?: string
}>(
  {
    height: 12,
    width: 12,
    borderRadius: '50%',
  },
  ({ $bgColor }) => ({
    background: $bgColor,
  })
)

export const TaskContainer = styled.div({
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
  paddingBottom: '1rem',
})

export const Card = styled.div({
  background: colors.c3,
  padding: '1rem',
  borderRadius: 6,
  width: 250,
})
