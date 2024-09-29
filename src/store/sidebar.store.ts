import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  open: boolean
  toggleOpen(): void
}

export const useSidebarStore = create(
  persist<State>(
    (set, get) => ({
      open: true,
      toggleOpen() {
        const { open } = get()
        set({ open: !open })
      },
    }),
    {
      name: 'sidebar',
    }
  )
)
