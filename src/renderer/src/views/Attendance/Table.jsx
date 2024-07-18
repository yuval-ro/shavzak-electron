import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

const TableRow = styled(Row)`
  user-select: none;
  height: 40px;
  align-items: center;
`
const TableHeaderRow = styled(TableRow)`
  font-weight: bold;
  background-color: lightgray;
`
const TableDataRow = styled(TableRow)`
  user-select: none;
  cursor: pointer;
  border-top: 1px solid lightgray;
  height: 40px;
  align-items: center;
  transition: background-color 0.3s ease; /* Optional: Add a smooth transition effect */

  &:hover {
    background-color: #f0f0f0; /* Change this to your desired hover color */
  }
`
const Scrollable = styled.div`
  max-height: 700px;
  overflow-y: scroll;
  overflow-x: hidden;
`

const TableContainer = styled.div`
  overflow-x: hidden;
`

const TableCol = styled(Col)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export default function Table({ cols, data, labels, sortFn, abbreviated, labelFn, style = {} }) {
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

  return (
    <TableContainer style={style}>
      <TableHeaderRow>
        <TableCol style={{ textAlign: 'center' }}>מס"ד</TableCol>
        {cols.map((col, idx) => (
          <TableCol key={idx}>{labels[col.key]._title}</TableCol>
        ))}
      </TableHeaderRow>
      <Scrollable>
        {(data && data.length) > 0 ? (
          data.sort(sortFn).map((item, idx) => (
            <TableDataRow key={idx}>
              <TableCol style={{ textAlign: 'center' }}>{idx + 1}</TableCol>
              {cols.map((col, idx) => (
                <TableCol key={idx}>{renderCellValue(col, item)}</TableCol>
              ))}
            </TableDataRow>
          ))
        ) : (
          <TableDataRow>
            <TableCol style={{ textAlign: 'center' }}>לא נמצאו נתונים...</TableCol>
          </TableDataRow>
        )}
      </Scrollable>
    </TableContainer>
  )
}
