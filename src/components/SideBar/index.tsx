import * as S from './styles'
import logo from '@/assets/logo.svg'
import { Text } from '../Text'
import { SidebarLink } from './components/SidebarLink'
import { colors } from '@/styles/colors'
import { useSideBar } from './hooks/use-side-bar'
import { boardService } from '@/services/board/board-service'

export const SideBar = () => {
  const { boards, onChangeActiveBoard, activeBoardId, open } = useSideBar({
    boardService,
  })

  return (
    <S.Wrapper $open={open}>
      <S.SideBarHeader>
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
        TODOS QUADROS ({boards.length})
      </Text>

      <ul>
        {boards.map((board) => (
          <li key={board.id} onClick={onChangeActiveBoard(board.id)}>
            <SidebarLink
              isActive={open && activeBoardId === board.id}
              title={board.name}
            />
          </li>
        ))}
        <li>
          <SidebarLink color={colors.c1} title={'+ Criar novo quadro'} />
        </li>
      </ul>
    </S.Wrapper>
  )
}
