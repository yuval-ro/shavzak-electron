import { useRef, cloneElement } from 'react'
import { Modal as BSModal, Button } from 'react-bootstrap'

import { FormSubmitProvider } from './context'

export default function Modal({ title, form, onCancel }) {
  const formikRef = useRef()

  return (
    <BSModal centered keyboard={false} backdrop="static" show={true} style={{ direction: 'rtl' }}>
      <BSModal.Header style={{ fontWeight: 'bold' }}>{title}</BSModal.Header>
      <FormSubmitProvider value={formikRef}>
        <BSModal.Body style={{ paddingBottom: '5px', paddingTop: '10px' }}>
          {cloneElement(form, { ref: formikRef })}
        </BSModal.Body>
        <BSModal.Footer>
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
        </BSModal.Footer>
      </FormSubmitProvider>
    </BSModal>
  )
}
