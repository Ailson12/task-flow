import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useBoardStore } from '@/store/board.store'
import { useSidebarStore } from '@/store/sidebar.store'
import { boardService } from '@/services/board/board-service'

export const useSideBar = () => {
  const { open, toggleOpen } = useSidebarStore()
  const { boardSelected, setBoardSelected } = useBoardStore()

  const { data, isSuccess, isFetching, isLoading } = useQuery({
    queryKey: ['list-boards'],
    queryFn: boardService.findAll,
  })

  const findBoardById = (id: number) => {
    return data?.find((board) => board.id === id)
  }

  const onChangeActiveBoard = (id: number) => () => {
    const board = findBoardById(id)
    if (board) {
      setBoardSelected(board)
    } else {
      console.error(`id ${id} is not included in the list of boards`)
    }
  }

  const activeBoardId = useMemo(() => boardSelected?.id ?? 0, [boardSelected])

  useEffect(() => {
    if (isFetching) return

    const firstBoard = data?.at(0)
    const board = findBoardById(boardSelected?.id ?? 0)
    setBoardSelected(board ?? firstBoard ?? null)
  }, [data, isFetching])

  return {
    open,
    toggleOpen,
    board: {
      isLoading,
      isSuccess,
      items: data ?? [],
    },
    activeBoardId,
    onChangeActiveBoard,
  }
}
