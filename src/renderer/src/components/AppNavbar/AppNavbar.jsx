import { Navbar, Nav } from 'react-bootstrap'
import { ChevronLeft as Left, ChevronRight as Right } from 'react-bootstrap-icons'
import moment from 'moment'

import { useSelector, useShifts } from '#src/store/hooks'
import BackendIndicator from './BackendIndicator'

export default function AppNavbar({ links, activeKey, onKeySelect }) {
  const pending = useSelector((state) => state?.pending)
  const shifts = useShifts()
  const currentShift = shifts?.docs[shifts?.idx]

  return (
    <Navbar
      className="bg-primary bg-gradient text-white"
      style={{ paddingRight: '2.2rem', paddingLeft: '2.2rem', userSelect: 'none' }}
    >
      {/* <Navbar.Brand className="text-white fw-bold">פלוגה מד</Navbar.Brand> */}
      <Nav
        variant="underline"
        activeKey={activeKey}
        onSelect={onKeySelect}
        className="hstack w-100"
      >
        <div className="hstack">
          <Right
            onClick={() => shifts.prev()}
            className="text-white"
            size="1rem"
            style={{ cursor: 'pointer' }}
          />
          <div disabled style={{ width: '8rem', textAlign: 'center' }}>
            {`${moment(currentShift?.start).format('dddd D.M')} ${currentShift?.type}`}
          </div>
          <Left
            onClick={() => shifts.next()}
            className="text-white"
            size="1rem"
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
        <Nav.Item className="ms-auto">
          <BackendIndicator toggle={pending} />
        </Nav.Item>
      </Nav>
    </Navbar>
  )
}
