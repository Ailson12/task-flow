import * as S from './styles'
import { Text } from '../Text'
import { Loading } from '../Loading'
import logo from '@/assets/logo.svg'
import { colors } from '@/styles/colors'
import { useSideBar } from './hooks/use-side-bar'
import { SidebarLink } from './components/SidebarLink'
import { CreateNewBoard } from './components/CreateNewBoard'

export const SideBar = () => {
  const { board, onChangeActiveBoard, activeBoardId, open, toggleOpen } =
    useSideBar()

  return (
    <S.Wrapper $open={open} aria-hidden={!open}>
      <S.SideBarHeader onClick={toggleOpen}>
        <img src={logo} alt="logo" width={44} height={44} />
        {open && <h1>TaskFlow</h1>}
      </S.SideBarHeader>

      <Text
        marginBottom={'1rem'}
        spacing={1}
        weight={600}
        size={13}
        color={colors.c2}
      >
        TODOS QUADROS ({board.items.length})
      </Text>

      <Loading
        isVisible={board.isLoading}
        spanProps={{
          'data-testid': 'sidebar-loader',
        }}
      />

      <ul>
        {board.items.map((board) => (
          <li key={board.id}>
            <SidebarLink
              title={board.title}
              onClick={onChangeActiveBoard(board.id)}
              isActive={open && activeBoardId === board.id}
            />
          </li>
        ))}
        <CreateNewBoard />
      </ul>
    </S.Wrapper>
  )
}
