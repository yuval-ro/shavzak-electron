import { Dropdown } from 'react-bootstrap'

import CustomToggle from './CustomToggle.jsx'
import * as Styled from "./Styled"

export default function ContextMenu({ direction, toggle, children }) {
  return (
    <Dropdown drop={direction} autoClose="outside" style={{ userSelect: 'none'}}>
      <Dropdown.Toggle as={CustomToggle}>{toggle}</Dropdown.Toggle>
      <Styled.Menu>{children}</Styled.Menu>
    </Dropdown>
  )
}
