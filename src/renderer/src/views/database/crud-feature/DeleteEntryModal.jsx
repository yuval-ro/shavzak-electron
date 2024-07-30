import { Modal, Button } from 'react-bootstrap'

export default function DeleteEntryModal({ type, onConfirm, onCancel }) {
  return (
    <Modal keyboard={false} backdrop="static" show={true} centered>
      <Modal.Header style={{ fontWeight: 'bold' }} className="bg-danger-subtle">
        {(() => {
          switch (type) {
            case 'person':
              return 'מחיקת רשומה קיימת - שוטר'
            case 'vehicle':
              return 'מחיקת רשומה קיימת - רכב'
            default:
              throw new Error()
          }
        })()}
      </Modal.Header>
      <Modal.Body style={{ paddingBottom: '5px', paddingTop: '10px' }}>
        <div style={{ textAlign: 'center' }}>
          <span>האם אתה בטוח שאתה מעוניין למחוק את הרשומה?</span>
          <br />
          <span>הפעולה איננה הפיכה!</span>
          <br />
          <br />
          {/* <span style={{ fontWeight: 'bold' }}>{labelFn[collection](item)}</span> */}
        </div>
      </Modal.Body>
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
            variant="outline-danger"
            onClick={onConfirm}
          >
            אשר
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
