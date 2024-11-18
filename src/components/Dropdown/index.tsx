import { FC, useState } from 'react'
import MoreVertIcon from '@/assets/more-vert-icon.svg'
import { DropdownList, DropdownListItem, DropdownWrapper } from './styles'

type DropdownProps = {
  items: string[]
}

export const Dropdown: FC<DropdownProps> = ({ items }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <DropdownWrapper>
      <button onClick={() => setIsVisible(!isVisible)}>
        <img src={MoreVertIcon} alt="mais ações" height={28} width={28} />
      </button>

      {isVisible && (
        <DropdownList>
          {items.map((item) => (
            <DropdownListItem key={item}>{item}</DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  )
}
