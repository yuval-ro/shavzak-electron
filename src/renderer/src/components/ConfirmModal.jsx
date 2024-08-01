import { Modal, Button } from 'react-bootstrap'

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  cancelButton = { text: 'בטל', variant: 'outline-secondary' },
  confirmButton = { text: 'אשר', variant: 'danger' }
}) {
  return (
    <Modal keyboard={false} backdrop="static" show={true} centered>
      <Modal.Header style={{ fontWeight: 'bold' }} className="bg-danger-subtle">
        {title}
      </Modal.Header>
      <Modal.Body style={{ paddingBottom: '5px', paddingTop: '10px' }}>
        {<div style={{ textAlign: 'center' }}>{message}</div>}
      </Modal.Body>
      <Modal.Footer>
        <div style={{ display: 'flex', justifyContent: 'start' }}>
          <Button
            style={{ width: '100px', marginLeft: '5px' }}
            variant={cancelButton.variant}
            onClick={onCancel}
          >
            {cancelButton.text}
          </Button>
          <Button
            style={{ width: '100px' }}
            type="submit"
            variant={confirmButton.variant}
            onClick={onConfirm}
          >
            {confirmButton.text}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
