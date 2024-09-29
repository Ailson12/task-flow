import styled from 'styled-components'

export const GridContainer = styled.div({
  minHeight: '100vh',
  display: 'flex',
})

export const ColumnContent = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
})

export const Content = styled.div({
  padding: '1.5rem',
  flex: 1,
})
