import { useRef, cloneElement } from 'react'
import { Modal, Button } from 'react-bootstrap'

import { FormSubmitProvider } from './context'

export default function AddModal({ show, onCancel, title, form }) {
  const formikRef = useRef()

  return (
    <Modal keyboard={false} backdrop="static" show={show} style={{ direction: 'rtl' }}>
      <Modal.Header style={{ fontWeight: 'bold' }}>{title}</Modal.Header>
      <FormSubmitProvider value={formikRef}>
        <Modal.Body style={{ paddingBottom: '5px', paddingTop: '10px' }}>
          {cloneElement(form, { ref: formikRef })}
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
              variant="outline-primary"
              onClick={() => {
                if (formikRef.current) {
                  formikRef.current.submitForm()
                }
              }}
            >
              שמור
            </Button>
          </div>
        </Modal.Footer>
      </FormSubmitProvider>
    </Modal>
  )
}
