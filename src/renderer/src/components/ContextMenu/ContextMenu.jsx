import { Dropdown } from 'react-bootstrap'

import CustomToggle from './CustomToggle.jsx'

export default function ContextMenu({ header, direction, toggle, children }) {
  return (
    <Dropdown drop={direction} autoClose="outside">
      <Dropdown.Toggle as={CustomToggle}>{toggle}</Dropdown.Toggle>
      <Dropdown.Menu>
        {header && (
          <>
            <Dropdown.Item disabled>{header}</Dropdown.Item>
            <Dropdown.Divider />
          </>
        )}
        {children}
      </Dropdown.Menu>
    </Dropdown>
  )
}
