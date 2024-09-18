import { useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'

import ParentContext from '../Context'

export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
  const { closeModal } = useContext(ParentContext)
  function handleConfirm() {
    if (onConfirm) {
      onConfirm()
    }
    closeModal()
  }
  function handleCancel() {
    if (onCancel) {
      onCancel()
    }
    closeModal()
  }
  return (
    <Modal keyboard={false} backdrop="static" show={true} centered style={{ direction: 'rtl' }}>
      <Modal.Header style={{ fontWeight: 'bold' }} className="bg-primary text-light">
        {title}
      </Modal.Header>
      <Modal.Body>
        {<div style={{ textAlign: 'center', height: '10rem' }}>{message}</div>}
      </Modal.Body>
      <Modal.Footer
        style={{ borderTop: 'none', paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
        className="bg-body-tertiary"
      >
        <div className="hstack gap-2">
          <Button
            style={{ width: '8rem', border: '1px solid lightgray' }}
            variant="light"
            onClick={handleCancel}
          >
            בטל
          </Button>
          <Button
            style={{ width: '8rem' }}
            type="submit"
            variant="outline-primary"
            onClick={handleConfirm}
          >
            אשר
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
