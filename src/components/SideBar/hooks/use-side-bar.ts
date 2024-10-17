import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSidebarStore } from '@/store/sidebar.store'
import { boardService } from '@/services/board/board-service'

export const useSideBar = () => {
  const { open } = useSidebarStore()
  const [activeBoardId, setActiveBoardId] = useState('')

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['list-boards'],
    queryFn: boardService.findAll,
  })

  const idIsIncludedInBoards = (id: string) => {
    const ids = data?.map((board) => board.id)
    return (ids ?? []).includes(id)
  }

  const onChangeActiveBoard = (id: string) => () => {
    const isIncluded = idIsIncludedInBoards(id)
    if (isIncluded) {
      setActiveBoardId(id)
    } else {
      console.error(`id ${id} is not included in the list of boards`)
    }
  }

  return {
    open,
    board: {
      isLoading,
      isSuccess,
      items: data ?? [],
    },
    activeBoardId,
    onChangeActiveBoard,
  }
}
