import { NavBar } from './components/NavBar'
import { SideBar } from './components/SideBar'
import { Board } from './pages/Board'
import * as S from './app.styles'

export const App = () => {
  return (
    <S.GridContainer>
      <SideBar />

      <S.ColumnContent>
        <NavBar />
        <S.Content>
          <Board />
        </S.Content>
      </S.ColumnContent>
    </S.GridContainer>
  )
}
