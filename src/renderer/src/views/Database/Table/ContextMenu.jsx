import { Menu, MenuItem, MenuDivider } from '@szhsin/react-menu'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import styled from 'styled-components'

const CustomMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: space-evenly;
`

export default function ContextMenu({ menuButton, label, onEdit, onDelete }) {
  return (
    <Menu align="end" viewScroll="close" menuButton={menuButton} transition>
      <CustomMenuItem disabled style={{ color: 'black' }}>
        {label}
      </CustomMenuItem>
      <MenuDivider />
      <CustomMenuItem onClick={onEdit}>
        <div>ערוך</div>
        <FaEdit />
      </CustomMenuItem>
      <CustomMenuItem className="text-danger" onClick={onDelete}>
        <div>מחק</div>
        <FaTrashAlt />
      </CustomMenuItem>
    </Menu>
  )
}
