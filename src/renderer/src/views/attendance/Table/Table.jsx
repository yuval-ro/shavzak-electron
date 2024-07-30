/**
 * @file Table.jsx
 */
import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import RubricTitle from './RubricTitle'
import ToggleCol from './ToggleCol'
import labels from '#src/labels.json'

const TableRow = styled(Row)`
  user-select: none;
  height: 50px;
  align-items: center;
  padding: 8px;
`
const TableDataRow = styled(TableRow)`
  border-top: 1px solid lightgray;
  align-items: center;
  transition: background-color 0.3s ease;
  padding-top: 0px;
  padding-bottom: 0px;
  height: 40px;
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
  height: '100%';
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const rubricNames = ['affiliation', 'firstName', 'lastName']

export default function Table({ shifts, entries, onToggle, style = {} }) {
  const [pagination, setPagination] = useState(0)
  const [shiftsPerPage, setShiftsPerPage] = useState(3)
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
              title={labels.person[rubricName]._title}
              active={activeRubric === rubricName}
              sortType={sortType}
              onClick={() => handleRubricClick(rubricName)}
              sortable={true}
            />
          </TableCol>
        ))}
        {shifts.slice(pagination, pagination + shiftsPerPage).map((shift, idx) => (
          <TableCol key={idx} className="px-0">
            {labels.shift.type[shift.type] +
              ' ' +
              shift.time.toLocaleString('he-IL', { day: 'numeric', month: 'numeric' })}
          </TableCol>
        ))}
      </TableRow>
      <Scrollable>
        {entries?.length > 0 ? (
          entries
            .sort((a, b) => {
              if (a[activeRubric] < b[activeRubric]) return sortType === 'ascending' ? -1 : 1
              if (a[activeRubric] > b[activeRubric]) return sortType === 'ascending' ? 1 : -1
              return 0
            })
            .map((entry, idx) => (
              <TableDataRow key={idx}>
                {rubricNames.map((rubricName, idx) => {
                  const value = entry[rubricName]
                  return <TableCol key={idx}>{labels.person[rubricName][value] ?? value}</TableCol>
                })}
                {shifts.slice(pagination, pagination + shiftsPerPage).map((shift, idx) => (
                  <TableCol key={idx} className="h-100 px-0">
                    <ToggleCol
                      as={Col}
                      state={shift.available.includes(entry._id)}
                      onClick={() => onToggle(shift._id, entry._id)}
                    />
                  </TableCol>
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
