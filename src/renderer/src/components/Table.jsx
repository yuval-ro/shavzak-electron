/**
 * @file /src/views/database/Table.jsx
 */
import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import { FaEdit, FaTrash } from 'react-icons/fa'

import ContextMenu from './ContextMenu'

const SORT_DIR = Object.freeze({
  asc: -1,
  desc: 1
})

// TODO Add docstring:
// cols: Array[{name: string, label: string, sortable: boolean, innerSort: (sortDir) => { ... }[1,0,-1] }]
// rows: Array[{key1: { value: ..., label: string }, ..., keyn: { value: ..., label: string}}]
export default function Table({ name, cols, rows, contextMenu}) {
  const [sortIdx, setSortIdx] = useState(0) // NOTE Index in cols array
  const [sortDir, setSortDir] = useState(SORT_DIR.asc)

  function defaultSort(a, b) {
    const key = cols[sortIdx].name
    if (a[key] < b[key]) return sortDir
    if (a[key] > b[key]) return -sortDir
    return 0
  }

  return (
    <>
      {/* HEADER ROW */}
      <TableRow className="bg-primary-subtle">
        {cols.map(({ label, sortable }, idx) => (
          <TableCol key={idx}>
            <ColHeader
              onClick={() => {
                if (idx === sortIdx) {
                  setSortDir(-1 * sortDir)
                } else {
                  setSortIdx(idx)
                  setSortDir(SORT_DIR.asc)
                }
              }}
              $active={idx === sortIdx}
              $disabled={!sortable}
            >
              {label}
              {idx === sortIdx && (sortDir === SORT_DIR.asc ? ' ▲' : ' ▼')}
            </ColHeader>
          </TableCol>
        ))}
      </TableRow>
      {/* DATA ROWS */}
      <Scrollable className="bg-body-secondary">
        {rows?.length > 0 ? (
          rows
            .sort(cols[sortIdx]?.innerSort ? cols[sortIdx].innerSort(sortDir) : defaultSort)
            .map((row, idx) => {
              const rowComponent = (
                <TableDataRow key={idx} className="bg-body">
                  {cols.map(({ name }, idx) => (
                    <TableCol key={idx}>{row[name]?.label}</TableCol>
                  ))}
                </TableDataRow>
              )
              if (contextMenu) {
                return (
                  <ContextMenu
                    key={idx}
                    title={'?'} // FIXME
                    options={[
                      {
                        label: 'ערוך',
                        icon: <FaEdit />,
                        onClick: () => contextMenu.handleAction(name, row, 'edit')
                      },
                      {
                        label: 'מחק',
                        icon: <FaTrash />,
                        onClick: () => contextMenu.handleAction(name, row, 'delete'),
                        className: 'text-danger'
                      }
                    ]}
                  >
                    {rowComponent}
                  </ContextMenu>
                )
              } else {
                return rowComponent
              }
            })
        ) : (
          <Row className="bg-body-tertiary" style={{ height: '2.5rem', cursor: 'auto' }}>
            <Col>לא נמצאו נתונים...</Col>
          </Row>
        )}
      </Scrollable>
    </>
  )
}

const TableRow = styled(Row)`
  user-select: none;
  height: 2.5rem;
  align-items: center;
  padding: 8px;
`
const TableCol = styled(Col)`
  max-width: 7rem;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
`
const TableDataRow = styled(TableRow)`
  cursor: pointer;
  border-top: 1px solid lightgray;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0 !important;
  }
`
const Scrollable = styled.div`
  height: 700px;
  overflow-y: scroll;
  overflow-x: hidden;
`

const ColHeader = styled.span`
  text-decoration: none;
  position: relative;
  user-select: none;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  color: ${(props) => (props.$disabled ? 'gray' : 'black')};

  &:hover {
    cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
    text-decoration: underline;
  }
`
