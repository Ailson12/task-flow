import { Board } from '@/types/board'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  boardSelected: Board | null
}

type Action = {
  setBoardSelected(board: State['boardSelected']): void
}

export const useBoardStore = create(
  persist<State & Action>(
    (set) => ({
      boardSelected: null,
      setBoardSelected(boardSelected) {
        set({ boardSelected })
      },
    }),
    {
      name: 'board',
    }
  )
)
