import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSidebarStore } from '@/store/sidebar.store'
import { boardService } from '@/services/board/board-service'

export const useSideBar = () => {
  const { open } = useSidebarStore()
  const [activeBoardId, setActiveBoardId] = useState('')

  const { data, isFetching, isLoading } = useQuery({
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
      isFetching,
      items: data ?? [],
    },
    activeBoardId,
    onChangeActiveBoard,
  }
}
