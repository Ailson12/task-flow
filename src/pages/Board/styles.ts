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

export const TaskContainer = styled.div<{
  $isDraggable?: boolean
}>(
  {
    display: 'flex',
    gap: '1rem',
    flex: 1,
    flexDirection: 'column',
    paddingBottom: '1rem',
  },
  ({ $isDraggable = false }) => ({
    ...($isDraggable && {
      background: '#262633',
    }),
  })
)

export const Card = styled.div<{
  $order?: number
}>(({ $order }) => ({
  width: 250,
  order: $order,
  padding: '1rem',
  display: 'flex',
  borderRadius: 6,
  alignItems: 'center',
  background: colors.c3,
  justifyContent: 'space-between',
}))
