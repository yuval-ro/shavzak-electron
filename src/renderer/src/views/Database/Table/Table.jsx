import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import ContextMenu from './ContextMenu'
import RubricTitle from './RubricTitle'

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

  &:hover {
    background-color: #f0f0f0;
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

export default function Table({
  rubrics,
  data,
  labels,
  sortFn,
  abbreviated,
  labelFn,
  onEdit,
  onDelete,
  style = {}
}) {
  const [activeRubric, setActiveRubric] = useState(null) // which rubric is the one the entries being sorted by
  const [sortType, setSortType] = useState('ascending') // or 'descending'

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

  function handleRubricClick(rubricKey) {
    if (activeRubric === rubricKey) {
      if (sortType === 'ascending') {
        setSortType('descending')
      } else {
        setActiveRubric(null)
        setSortType('ascending')
      }
    } else {
      setActiveRubric(rubricKey)
      setSortType('ascending')
    }
  }

  function getSortedData() {
    if (!activeRubric) return data

    return [...data].sort((a, b) => {
      if (a[activeRubric] < b[activeRubric]) return sortType === 'ascending' ? -1 : 1
      if (a[activeRubric] > b[activeRubric]) return sortType === 'ascending' ? 1 : -1
      return 0
    })
  }

  const sortedData = getSortedData()

  return (
    <TableContainer style={style}>
      <TableHeaderRow>
        {rubrics.map((rubric, idx) => (
          <TableCol key={idx}>
            <RubricTitle
              title={labels[rubric.key]._title}
              active={activeRubric === rubric.key}
              sortType={sortType}
              onClick={() => handleRubricClick(rubric.key)}
              disabled={!rubric.sortable}
            />
          </TableCol>
        ))}
      </TableHeaderRow>
      <Scrollable>
        {(sortedData && sortedData.length) > 0 ? (
          sortedData.map((item, idx) => (
            <ContextMenu
              _id={item?._id}
              label={labelFn(item)}
              key={idx}
              menuButton={
                <TableDataRow>
                  {rubrics.map((col, idx) => (
                    <TableCol key={idx}>{renderCellValue(col, item)}</TableCol>
                  ))}
                </TableDataRow>
              }
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
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
