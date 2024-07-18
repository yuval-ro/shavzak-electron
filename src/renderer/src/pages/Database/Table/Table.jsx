import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import ContextMenu from './ContextMenu'

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

export default function Table({
  cols,
  data,
  labels,
  sortFn,
  abbreviated,
  labelFn,
  onEdit,
  onDelete
}) {
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

  function handleDelete(id) {
    const item = data.find((item) => item._id === id)
    onDelete(item)
  }

  function handleEdit(id) {
    const item = data.find((item) => item._id === id)
    onEdit(item)
  }

  return (
    <>
      <TableHeaderRow>
        <IdxCol>מס"ד</IdxCol>
        {cols.map((col, idx) => (
          <Col key={idx}>{labels[col.key]._title}</Col>
        ))}
      </TableHeaderRow>
      <Scrollable>
        {data.sort(sortFn).map((item, idx) => (
          <ContextMenu
            _id={item?._id}
            label={labelFn(item)}
            key={idx}
            menuButton={
              <TableDataRow>
                <IdxCol>{idx + 1}</IdxCol>
                {cols.map((col, idx) => (
                  <Col key={idx}>{renderCellValue(col, item)}</Col>
                ))}
              </TableDataRow>
            }
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </Scrollable>
    </>
  )
}
