import { Dropdown } from 'react-bootstrap'

import CustomToggle from './CustomToggle.jsx'

export default function ContextMenu({ direction, toggle, children }) {
  return (
    <Dropdown drop={direction} autoClose="outside">
      <Dropdown.Toggle as={CustomToggle}>{toggle}</Dropdown.Toggle>
      <Dropdown.Menu>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  )
}
