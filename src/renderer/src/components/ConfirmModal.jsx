import { Modal, Button } from 'react-bootstrap'

export default function ConfirmModal({
  title,
  message,
  onSubmit,
  onCancel,
  cancelButton,
  submitButton
}) {
  return (
    <Modal keyboard={false} backdrop="static" show={true} centered>
      <Modal.Header style={{ fontWeight: 'bold' }} className="bg-danger-subtle">
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
            style={{ width: '8rem', border: '1px solid lightgray', ...cancelButton?.style }}
            variant={cancelButton?.variant ?? 'light'}
            onClick={onCancel}
          >
            {cancelButton?.text ?? 'בטל'}
          </Button>
          <Button
            style={{ width: '8rem' }}
            type="submit"
            variant={submitButton?.variant ?? 'outline-danger'}
            onClick={onSubmit}
          >
            {submitButton?.text ?? 'אשר'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
