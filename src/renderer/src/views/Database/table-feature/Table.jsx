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

export default function Table({
  collection,
  rubricNames,
  entries,
  labels,
  labelFn,
  onEdit,
  onDelete,
  style = {}
}) {
  const [activeRubric, setActiveRubric] = useState(rubricNames[0]) // which rubric is the one the entries being sorted by
  const [sortType, setSortType] = useState('ascending') // or 'descending'

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

  return (
    <TableContainer style={style}>
      <TableRow className="bg-primary-subtle">
        {rubricNames.map((rubricName, idx) => (
          <TableCol key={idx}>
            <RubricTitle
              title={labels[rubricName]._title}
              active={activeRubric === rubricName}
              sortType={sortType}
              onClick={() => handleRubricClick(rubricName)}
              sortable={true}
            />
          </TableCol>
        ))}
      </TableRow>
      <Scrollable>
        {entries.length > 0 ? (
          entries
            .sort((a, b) => {
              if (a[activeRubric] < b[activeRubric]) return sortType === 'ascending' ? -1 : 1
              if (a[activeRubric] > b[activeRubric]) return sortType === 'ascending' ? 1 : -1
              return 0
            })
            .map((entry, idx) => (
              <ContextMenu
                label={labelFn(entry)}
                key={idx}
                menuButton={
                  <TableDataRow className="bg-body-tertiary">
                    {rubricNames.map((rubricName, idx) => (
                      <TableCol key={idx}>
                        {labels[rubricName][entry[rubricName]] ?? entry[rubricName]}
                      </TableCol>
                    ))}
                  </TableDataRow>
                }
                onDelete={() => onDelete(collection, entry)}
                onEdit={() => onEdit(collection, entry)}
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
