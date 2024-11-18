import { boardService } from '@/services/board/board-service'
import { useBoardStore } from '@/store/board.store'
import { useSidebarStore } from '@/store/sidebar.store'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const useNavbar = () => {
  const queryClient = useQueryClient()
  const { toggleOpen } = useSidebarStore()
  const { boardSelected, setBoardSelected } = useBoardStore()

  const [taskOpen, setTaskOpen] = useState(false)
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
    boardSelected,
    removeBoardSelected,
    confirmRemoveIsOpen: {
      value: confirmRemoveIsOpen,
      onChange: setConfirmRemoveIsOpen,
    },
  }
}
