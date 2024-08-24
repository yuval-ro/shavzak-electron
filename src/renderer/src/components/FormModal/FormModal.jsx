/**
 * @file /src/components/FormModal/FormModal.jsx
 */
import { useRef } from 'react'
import { Modal, Button, OverlayTrigger, Tooltip, NavLink } from 'react-bootstrap'
import { QuestionCircleFill as Help } from 'react-bootstrap-icons'

import SubmitProvider from './SubmitProvider'
import './styles.scss'

export default function FormModal({
  headerText,
  onSubmit,
  onCancel,
  cancelButton,
  submitButton,
  headerClassName,
  children
}) {
  const submitRef = useRef(null)
  function handleSubmitButtonClick() {
    submitRef?.current?.triggerSubmit()
  }
  return (
    <Modal backdrop="static" show={true} dir="rtl">
      <Modal.Header
        style={{ fontWeight: 'bold' }}
        className={headerClassName ?? 'bg-primary-subtle'}
      >
        {headerText}
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              <div className="small my-1">שדות המסומנים בכוכבית הינם שדות חובה!</div>
            </Tooltip>
          }
        >
          <NavLink className="ms-auto">
            <Help size="1.5rem" className="ms-auto" />
          </NavLink>
        </OverlayTrigger>
      </Modal.Header>
      <SubmitProvider value={{ submitRef, onSubmit }}>
        <Modal.Body style={{ paddingBottom: '0px', paddingTop: '0px' }}>{children}</Modal.Body>
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
              variant={submitButton?.variant ?? 'primary'}
              onClick={handleSubmitButtonClick}
            >
              {submitButton?.text ?? 'שלח'}
            </Button>
          </div>
        </Modal.Footer>
      </SubmitProvider>
    </Modal>
  )
}
