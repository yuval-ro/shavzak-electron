import { Dropdown } from 'react-bootstrap'
import { MdKeyboardArrowLeft } from 'react-icons/md'

import ItemContent from './ItemContent.jsx'
import * as Styled from './Styled'
import './SubMenu.css'

export default function SubMenu({ label, icon, children }) {
  return (
    <Dropdown autoClose="outside" drop="end">
      <Dropdown.Toggle
        as={Styled.Item}
        style={{ display: 'flex', alignItems: 'center', paddingLeft: '0.1rem' }}
      >
        <ItemContent label={label} icon={icon} />
        <MdKeyboardArrowLeft size="1.5rem" className="ms-auto" />
      </Dropdown.Toggle>
      <Styled.Menu>{children}</Styled.Menu>
    </Dropdown>
  )
}
