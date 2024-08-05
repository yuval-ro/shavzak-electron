import { Dropdown } from 'react-bootstrap'

import ItemContent from './ItemContent.jsx'

export default function Item({ label, icon, onClick, disabled = false }) {
  return (
    <Dropdown.Item onClick={onClick} disabled={disabled}>
      <ItemContent label={label} icon={icon} />
    </Dropdown.Item>
  )
}
