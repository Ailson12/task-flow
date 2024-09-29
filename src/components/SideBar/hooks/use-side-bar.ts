import { useState } from 'react'
import { useSidebarStore } from '@/store/sidebar.store'
import { BoardService } from '@/services/board/board'
import { useQuery } from '@tanstack/react-query'

type Params = {
  boardService: BoardService
}

export const useSideBar = ({ boardService }: Params) => {
  const { open } = useSidebarStore()
  const [activeBoardId, setActiveBoardId] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['list-boards'],
    queryFn: boardService.findAll,
  })

  const onChangeActiveBoard = (id: string) => () => {
    setActiveBoardId(id)
  }

  return {
    open,
    board: {
      isLoading,
      items: data ?? [],
    },
    activeBoardId,
    onChangeActiveBoard,
  }
}
