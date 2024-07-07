import styled from 'styled-components'
import { NavBar } from './components/NavBar'
import { SideBar } from './components/SideBar'
import { Board } from './pages/Board'

export const App = () => {
  return (
    <GridContainer>
      <SideBar />

      <ColumnContent>
        <NavBar />
        <Content>
          <Board />
        </Content>
      </ColumnContent>
    </GridContainer>
  )
}

const GridContainer = styled.div({
  minHeight: '100vh',
  display: 'flex',
})

const ColumnContent = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
})

const Content = styled.div({
  padding: '1.5rem',
  flex: 1,
})
