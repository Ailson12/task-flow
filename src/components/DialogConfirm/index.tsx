import { FC } from 'react'
import { Button } from '../Button'
import { Dialog } from '../Dialog'

type DialogConfirmProps = {
  onConfirm?: () => void
  onCancel?: () => void
  open: boolean
  onClose(): void
}

export const DialogConfirm: FC<DialogConfirmProps> = ({
  open,
  onClose,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog.Root maxWidth={400} open={open}>
      <Dialog.Header onClose={onClose} title="Deseja confirmar esta ação?" />

      <div className="d-flex gap-2" style={{ marginTop: 40 }}>
        <Button className="w-100" onClick={onConfirm}>
          Sim
        </Button>
        <Button
          className="w-100"
          variant="secondary"
          onClick={() => {
            onClose()
            onCancel?.()
          }}
        >
          Não
        </Button>
      </div>
    </Dialog.Root>
  )
}
