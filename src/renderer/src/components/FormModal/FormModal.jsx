/**
 * @file /src/components/FormModal/FormModal.jsx
 */
import { useRef, cloneElement, Children } from 'react'
import { Modal, Button } from 'react-bootstrap'

import { FormSubmitProvider } from './context'

export default function FormModal({
  headerText,
  onSubmit,
  onCancel,
  cancelButton = { text: 'בטל', variant: 'outline-secondary' },
  submitButton = { text: 'שמור', variant: 'primary' },
  headerClassName = 'bg-primary-subtle',
  children
}) {
  const formikRef = useRef()
  return (
    <Modal keyboard={false} backdrop="static" show={true}>
      <Modal.Header style={{ fontWeight: 'bold' }} className={headerClassName}>
        {headerText}
      </Modal.Header>
      <FormSubmitProvider value={formikRef}>
        <Modal.Body style={{ paddingBottom: '0px', paddingTop: '0px' }}>
          {Children.map(children, (child) => cloneElement(child, { ref: formikRef, onSubmit }))}
        </Modal.Body>
        <Modal.Footer className="p-1">
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
        </Modal.Footer>
      </FormSubmitProvider>
    </Modal>
  )
}
