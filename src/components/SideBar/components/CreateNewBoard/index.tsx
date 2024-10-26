import { Dialog } from '@/components/Dialog'
import { Input } from '@/components/Input'
import { FC, useState } from 'react'

export const CreateNewBoard: FC = () => {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <button onClick={() => setOpen(!open)}>LIGAR/DESLIGAR</button>
      <Dialog.Root open={open}>
        <Dialog.Header
          title="Adicionar nova Atividade"
          onClose={() => setOpen(false)}
        />

        <Input label="Título" />
      </Dialog.Root>
    </div>
  )
}
