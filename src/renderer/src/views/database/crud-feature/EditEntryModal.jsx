import { useRef, cloneElement } from 'react'
import { Modal as BSModal, Button } from 'react-bootstrap'

import { FormSubmitProvider } from './context'
import labels from '#src/labels.json'

export default function EditEntryModal({ mode, type, form, onCancel }) {
  const formikRef = useRef()
  function getHeaderClassname() {
    switch (mode) {
      case 'new':
        return 'bg-primary-subtle'
      case 'existing':
        return 'bg-warning-subtle'
      default:
        throw new Error()
    }
  }
  function getTitle() {
    switch (mode) {
      case 'new':
        return `הוספת רשומה חדשה - ${labels[type]._title}`
      case 'existing':
        return `עריכת רשומה קיימת - ${labels[type]._title}`
      default:
        throw new Error()
    }
  }
  function getButtonVariant() {
    switch (mode) {
      case 'new':
        return 'outline-primary'
      case 'existing':
        return 'outline-warning'
      default:
        throw new Error()
    }
  }
  return (
    <BSModal keyboard={false} backdrop="static" show={true}>
      <BSModal.Header style={{ fontWeight: 'bold' }} className={getHeaderClassname()}>
        {getTitle()}
      </BSModal.Header>
      <FormSubmitProvider value={formikRef}>
        <BSModal.Body style={{ paddingBottom: '0px', paddingTop: '0px' }}>
          {cloneElement(form, { ref: formikRef })}
        </BSModal.Body>
        <BSModal.Footer className="p-1">
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
              variant={getButtonVariant()}
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
