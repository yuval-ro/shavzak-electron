// Layout.jsx
import { useContext } from 'react'
import { Modal, OverlayTrigger, Tooltip, NavLink, Button } from 'react-bootstrap'
import { QuestionCircleFill as Help } from 'react-bootstrap-icons'

import Context from './Context'

export default function Layout({ title, form }) {
  const { onCancel, formikRef } = useContext(Context)
  return (
    <Modal backdrop="static" show={true} dir="rtl">
      <Modal.Header style={{ fontWeight: 'bold' }} className="bg-primary text-light">
        {title}
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

      <Modal.Body style={{ paddingBottom: '0px', paddingTop: '0px' }}>{form}</Modal.Body>
      <Modal.Footer
        style={{ borderTop: 'none', paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
        className="bg-body-tertiary"
      >
        <div className="hstack gap-2">
          <Button
            style={{ width: '8rem', border: '1px solid lightgray' }}
            variant="light"
            onClick={onCancel}
          >
            בטל
          </Button>
          <Button
            style={{ width: '8rem' }}
            variant="outline-primary"
            onClick={() => formikRef?.current?.triggerSubmit()}
          >
            שלח
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
