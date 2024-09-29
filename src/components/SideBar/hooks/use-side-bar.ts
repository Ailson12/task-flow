import { useEffect, useState } from 'react'
import { useSidebarStore } from '@/store/sidebar.store'
import { Board, BoardService } from '@/services/board/board'

type Params = {
  boardService: BoardService
}

export const useSideBar = ({ boardService }: Params) => {
  const { open } = useSidebarStore()
  const [boards, setBoards] = useState<Board[]>([])
  const [activeBoardId, setActiveBoardId] = useState('')

  const fetchBoards = () => {
    boardService.findAll().then((data) => {
      setBoards(data)
    })
  }

  useEffect(() => {
    fetchBoards()
  }, [])

  const onChangeActiveBoard = (id: string) => () => {
    setActiveBoardId(id)
  }

  return {
    open,
    boards,
    activeBoardId,
    onChangeActiveBoard,
  }
}
