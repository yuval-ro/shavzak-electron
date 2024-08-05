import { Dropdown } from 'react-bootstrap'
import { MdKeyboardArrowLeft } from 'react-icons/md'

import ItemContent from './ItemContent.jsx'
import './SubMenu.css'

export default function SubMenu({ label, icon, children }) {
  return (
    <Dropdown autoClose="outside" drop="end">
      <Dropdown.Toggle
        as={Dropdown.Item}
        style={{ display: 'flex', alignItems: 'center', paddingLeft: '0.3rem' }}
      >
        <ItemContent label={label} icon={icon} />
        <MdKeyboardArrowLeft size="1.5rem" className="ms-auto" />
      </Dropdown.Toggle>
      <Dropdown.Menu>{children}</Dropdown.Menu>
    </Dropdown>
  )
}
