import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import ContextMenu from './ContextMenu'
import RubricTitle from './RubricTitle'

const TableRow = styled(Row)`
  user-select: none;
  height: 50px;
  align-items: center;
  padding: 8px;
`
const TableDataRow = styled(TableRow)`
  user-select: none;
  cursor: pointer;
  border-top: 1px solid lightgray;
  height: 40px;
  align-items: center;

  &:hover {
    background-color: #f0f0f0 !important;
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

export default function Table({ rubrics, data, labels, labelFn, onEdit, onDelete, style = {} }) {
  const [activeRubric, setActiveRubric] = useState(rubrics[0]) // which rubric is the one the entries being sorted by
  const [sortType, setSortType] = useState('ascending') // or 'descending'

  function handleDelete(id) {
    const item = data.find((item) => item._id === id)
    onDelete(item)
  }

  function handleEdit(id) {
    const item = data.find((item) => item._id === id)
    onEdit(item)
  }

  function handleRubricClick(rubric) {
    if (activeRubric === rubric) {
      if (sortType === 'ascending') {
        setSortType('descending')
      } else {
        setActiveRubric(null)
        setSortType('ascending')
      }
    } else {
      setActiveRubric(rubric)
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
      <TableRow className="bg-primary-subtle">
        {rubrics.map((rubric, idx) => (
          <TableCol key={idx}>
            <RubricTitle
              title={labels[rubric]?._title ?? 'None'}
              active={activeRubric === rubric}
              sortType={sortType}
              onClick={() => handleRubricClick(rubric)}
              sortable={true}
            />
          </TableCol>
        ))}
      </TableRow>
      <Scrollable>
        {(sortedData && sortedData.length) > 0 ? (
          sortedData.map((item, idx) => (
            <ContextMenu
              label={labelFn(item)}
              key={idx}
              menuButton={
                <TableDataRow className="bg-body-tertiary">
                  {rubrics.map((rubric, idx) => (
                    <TableCol key={idx}>{labels[rubric][item[rubric]] ?? item[rubric]}</TableCol>
                  ))}
                </TableDataRow>
              }
              onDelete={() => handleDelete(item._id)}
              onEdit={() => handleEdit(item._id)}
            />
          ))
        ) : (
          <TableDataRow className="bg-body-tertiary">
            <TableCol style={{ textAlign: 'center' }}>לא נמצאו נתונים...</TableCol>
          </TableDataRow>
        )}
      </Scrollable>
    </TableContainer>
  )
}
