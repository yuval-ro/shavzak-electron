/**
 * @file Table.jsx
 */
import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import ToggleCol from './ToggleCol'
import labels from '#src/labels.json'

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
  border-top: 1px solid lightgray;
  align-items: center;
  transition: background-color 0.3s ease;

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

export default function Table({ shifts, data, sortFn, onToggle, style = {} }) {
  const [pagination, setPagination] = useState(0)
  const [shiftsPerPage, setShiftsPerPage] = useState(3)

  return (
    <TableContainer style={style}>
      <TableHeaderRow>
        <TableCol xs={2}>שיוך</TableCol>
        <TableCol xs={2}>שם</TableCol>
        {shifts.slice(pagination, pagination + shiftsPerPage).map((shift, idx) => (
          <TableCol key={idx} className="px-0">
            {labels.shift.type[shift.type] +
              ' ' +
              shift.time.toLocaleString('he-IL', { day: 'numeric', month: 'numeric' })}
          </TableCol>
        ))}
      </TableHeaderRow>
      <Scrollable>
        {(data && data.length) > 0 ? (
          data.sort(sortFn).map((person, personIdx) => (
            <TableDataRow key={personIdx}>
              <TableCol xs={2}>{labels.person.affiliation[person.affiliation]}</TableCol>
              <TableCol xs={2}>{person?.first_name + ' ' + person?.last_name}</TableCol>
              {shifts.slice(pagination, pagination + shiftsPerPage).map((shift, idx) => (
                <TableCol key={idx} className="h-100 px-0">
                  <ToggleCol
                    as={Col}
                    state={shift.available.includes(person._id)}
                    onClick={() => onToggle(shift._id, person._id)}
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
