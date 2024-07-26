import { Modal, Button } from 'react-bootstrap'

export default function ConfirmModal({ title, body, onConfirm, onCancel, okButtonVariant }) {
  return (
    <Modal keyboard={false} backdrop="static" show={true} centered>
      <Modal.Header style={{ fontWeight: 'bold' }}>{title}</Modal.Header>
      <Modal.Body style={{ paddingBottom: '5px', paddingTop: '10px' }}>{body}</Modal.Body>
      <Modal.Footer>
        <div style={{ display: 'flex', justifyContent: 'start' }}>
          <Button
            style={{ width: '100px', marginLeft: '5px' }}
            variant="outline-secondary"
            onClick={onCancel}
          >
            בטל
          </Button>
          <Button
            style={{ width: '100px' }}
            type="submit"
            variant={okButtonVariant}
            onClick={onConfirm}
          >
            המשך
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
