/**
 * @file /src/components/FormModal/Modal.jsx
 */
import { useRef, cloneElement } from 'react'
import { Modal as BSModal, Button } from 'react-bootstrap'

import { FormSubmitProvider } from './context'

export default function Modal({
  title,
  form,
  onCancel,
  cancelButton = { text: 'בטל', variant: 'outline-secondary' },
  submitButton = { text: 'שמור', variant: 'primary' },
  headerClassName = 'bg-primary-subtle'
}) {
  const formikRef = useRef()
  return (
    <BSModal keyboard={false} backdrop="static" show={true}>
      <BSModal.Header style={{ fontWeight: 'bold' }} className={headerClassName}>
        {title}
      </BSModal.Header>
      <FormSubmitProvider value={formikRef}>
        <BSModal.Body style={{ paddingBottom: '0px', paddingTop: '0px' }}>
          {cloneElement(form, { ref: formikRef })}
        </BSModal.Body>
        <BSModal.Footer className="p-1">
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
              variant={submitButton.variant}
              onClick={() => {
                if (formikRef.current) {
                  formikRef.current.submitForm()
                }
              }}
            >
              {submitButton.text}
            </Button>
          </div>
        </BSModal.Footer>
      </FormSubmitProvider>
    </BSModal>
  )
}
