import { useState } from 'react'

export type DropdownItem = Record<string, unknown> & {
  key: string
  label: string
  onClick(row: DropdownItem): void
}

type Params = {
  items: DropdownItem[]
}

export const useDropdown = (params: Partial<Params> = {}) => {
  const [isVisible, setIsVisible] = useState(false)

  const onClose = () => setIsVisible(false)

  const toggleVisible = () => {
    setIsVisible(!isVisible)
  }

  const listIsOpen = isVisible && (params.items ?? []).length > 0

  return {
    onClose,
    isVisible,
    listIsOpen,
    toggleVisible,
  }
}
