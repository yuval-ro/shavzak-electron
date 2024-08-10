import { Navbar, Nav, Spinner } from 'react-bootstrap'
import { MdNavigateNext as Prev, MdNavigateBefore as Next } from 'react-icons/md'
import moment from 'moment'

import { useShiftStore } from '#src/hooks'

export default function TopNavbar({ links, activeKey, onKeySelect }) {
  const shiftStore = useShiftStore()
  const shift = shiftStore?.shifts?.[shiftStore?.idx]
  return (
    <Navbar
      className="bg-primary bg-gradient"
      style={{ paddingRight: '2.2rem', userSelect: 'none' }}
    >
      {/* <Navbar.Brand className="text-white fw-bold">פלוגה מד</Navbar.Brand> */}
      <Nav variant="underline" activeKey={activeKey} onSelect={onKeySelect} className="hstack">
        <div className="text-white hstack ms-auto">
          <Prev
            onClick={() => shiftStore.prev()}
            className="text-white"
            size="1.5rem"
            style={{ cursor: 'pointer' }}
          />
          <div disabled style={{ width: '8rem', textAlign: 'center' }}>
            {shiftStore.pending ? (
              <Spinner animation="border" size="sm" />
            ) : (
              `${moment(shift?.start).format('dddd D.M')} ${shift?.type}`
            )}
          </div>
          <Next
            onClick={() => shiftStore.next()}
            className="text-white"
            size="1.5rem"
            style={{ cursor: 'pointer' }}
          />
        </div>
        {links.map(({ value, label }, idx) => (
          <Nav.Item key={idx}>
            <Nav.Link eventKey={value} className="text-white">
              {label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Navbar>
  )
}
