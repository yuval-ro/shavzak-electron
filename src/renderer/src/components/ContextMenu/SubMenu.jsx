import { Dropdown } from 'react-bootstrap'

import ItemContent from './ItemContent.jsx'

export default function SubMenu({ label, icon, children }) {
  return (
    <Dropdown autoClose="outside" drop="end">
      <Dropdown.Toggle as={Dropdown.Item}>
        <ItemContent label={label} icon={icon} />
      </Dropdown.Toggle>
      <Dropdown.Menu>{children}</Dropdown.Menu>
    </Dropdown>
  )
}
