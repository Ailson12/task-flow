import { FC } from 'react'
import MoreVertIcon from '@/assets/more-vert-icon.svg'
import {
  DropdownBackground,
  DropdownList,
  DropdownListItem,
  DropdownWrapper,
} from './styles'
import { DropdownItem, useDropdown } from './hooks/useDropdown'

type DropdownProps = {
  items: DropdownItem[]
}

export const Dropdown: FC<DropdownProps> = ({ items }) => {
  const { listIsOpen, isVisible, toggleVisible, onClose } = useDropdown({
    items,
  })

  return (
    <DropdownWrapper>
      <DropdownBackground $isVisible={isVisible} onClick={onClose} />

      <button onClick={toggleVisible}>
        <img src={MoreVertIcon} alt="mais ações" height={28} width={28} />
      </button>

      {listIsOpen && (
        <DropdownList>
          {items.map((item) => (
            <DropdownListItem
              key={item.key}
              onClick={() => {
                onClose()
                item.onClick(item)
              }}
            >
              {item.label}
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  )
}
