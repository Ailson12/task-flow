import * as S from './app.styles'
import { Board } from './pages/Board'
import { NavBar } from './components/NavBar'
import { SideBar } from './components/SideBar'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

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

      <ToastContainer autoClose={2500} theme="dark" />
    </S.GridContainer>
  )
}
