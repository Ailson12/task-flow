import { useState } from 'react'
import { toast } from 'react-toastify'
import { useBoardStore } from '@/store/board.store'
import { useQueryClient } from '@tanstack/react-query'
import { useSidebarStore } from '@/store/sidebar.store'
import { boardService } from '@/services/board/board-service'

export const useNavbar = () => {
  const queryClient = useQueryClient()
  const { toggleOpen } = useSidebarStore()
  const { boardSelected, setBoardSelected } = useBoardStore()

  const [taskOpen, setTaskOpen] = useState(false)
  const [boardOpen, setBoardOpen] = useState(false)
  const [confirmRemoveIsOpen, setConfirmRemoveIsOpen] = useState(false)

  const removeBoardSelected = async () => {
    const { id = 0 } = boardSelected ?? {}
    setConfirmRemoveIsOpen(false)

    await toast.promise(boardService.remove(id), {
      error: 'Erro ao excluir quadro',
      pending: 'Excluindo...',
      success: 'Quadro removido com sucesso!',
    })
    setBoardSelected(null)
    queryClient.invalidateQueries({
      queryKey: ['list-boards'],
    })
  }

  return {
    toggleOpen,
    taskOpen: {
      value: taskOpen,
      onChange: setTaskOpen,
    },
    boardOpen: {
      value: boardOpen,
      onChange: setBoardOpen,
    },
    boardSelected,
    removeBoardSelected,
    confirmRemoveIsOpen: {
      value: confirmRemoveIsOpen,
      onChange: setConfirmRemoveIsOpen,
    },
  }
}
