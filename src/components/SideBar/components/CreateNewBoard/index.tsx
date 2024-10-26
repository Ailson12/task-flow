import { Dialog } from '@/components/Dialog'
import { Text } from '@/components/Text'
import { FC, useState } from 'react'

export const CreateNewBoard: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setOpen(!open)}>LIGAR/DESLIGAR</button>
      <Dialog.Root open={open}>
        <Dialog.Header title="Adicionar nova Atividade" />

        <Text>Inputs</Text>
      </Dialog.Root>
    </div>
  )
}
