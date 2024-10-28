import { Dialog } from '@/components/Dialog'
import { Input } from '@/components/Input'
import { TextArea } from '@/components/TextArea'
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

        <div className="d-flex flex-column gap-2">
          <Input label="Título" />
          <TextArea label="Descrição" />
        </div>
      </Dialog.Root>
    </div>
  )
}
