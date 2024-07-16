import { Row, Col, Container, ListGroup, Button } from 'react-bootstrap'
import { Menu, MenuItem, MenuDivider } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import styled from 'styled-components'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'

export default function Table({ cols, data, labels, sortFn, abbreviated }) {
  function renderCellValue({ key, translate }, item) {
    const value = item[key]
    if (translate) {
      if (Array.isArray(value)) {
        const translated_values = value.map((sub_value) => labels[key][sub_value])
        return translated_values.join(', ')
      } else {
        const translated_value = labels[key][value]
        return Array.isArray(translated_value)
          ? (abbreviated && translated_value[1]) ?? translated_value[0]
          : translated_value
      }
    } else {
      return value
    }
  }

  const IdxCol = styled(Col)`
    max-width: 50px;
    text-align: center;
  `
  const TableRow = styled(Row)`
    user-select: none;
    cursor: pointer;
    height: 40px;
    align-items: center;
  `
  const TableHeaderRow = styled(TableRow)`
    font-weight: bold;
  `
  const TableDataRow = styled(TableRow)`
    user-select: none;
    cursor: pointer;
    height: 40px;
    align-items: center;
    transition: background-color 0.3s ease; /* Optional: Add a smooth transition effect */

    &:hover {
      background-color: #f0f0f0; /* Change this to your desired hover color */
    }
  `
  const Scrollable = styled.div`
    max-height: 500px; /* Adjust as  needed */
    overflow-y: auto;
  `
  const CustomMenuItem = styled(MenuItem)`
    display: flex;
    justify-content: space-evenly;
  `

  const ContextMenu = (props) => (
    <Menu align="end" viewScroll="close" menuButton={props?.menuButton} transition>
      <CustomMenuItem disabled style={{ color: 'black' }}>
        {props?.label}
      </CustomMenuItem>
      <MenuDivider />
      <CustomMenuItem>
        <div>ערוך</div>
        <FaEdit />
      </CustomMenuItem>
      <CustomMenuItem className="text-danger">
        <div>מחק</div>
        <FaTrashAlt />
      </CustomMenuItem>
    </Menu>
  )

  return (
    <div style={{ direction: 'rtl' }}>
      <ListGroup>
        <TableHeaderRow>
          <IdxCol>מס"ד</IdxCol>
          {cols.map((col, idx) => (
            <Col key={idx}>{labels[col.key]._title}</Col>
          ))}
        </TableHeaderRow>
        <Scrollable>
          {data.sort(sortFn).map((item, idx) => (
            <ContextMenu
              label={`${item?.first_name} ${item?.last_name}`}
              key={idx}
              menuButton={
                <TableDataRow>
                  <IdxCol>{idx + 1}</IdxCol>
                  {cols.map((col, idx) => (
                    <Col key={idx}>{renderCellValue(col, item)}</Col>
                  ))}
                </TableDataRow>
              }
            />
          ))}
        </Scrollable>
      </ListGroup>
    </div>
  )
}
