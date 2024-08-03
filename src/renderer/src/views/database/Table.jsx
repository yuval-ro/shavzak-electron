/**
 * @file /src/views/database/Table.jsx
 */
import { useState, forwardRef } from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import { FaEdit, FaTrash } from 'react-icons/fa'

import ContextMenu from '../../components/ContextMenu'
import RubricTitle from './RubricTitle'

const TableDataRowToggle = forwardRef(({ children, onClick }, ref) => {
  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children}
    </div>
  )
})
TableDataRowToggle.displayName = 'TableDataRowToggle'

export default function Table({ schema, labelFn, columns, entries, onEdit, onDelete, customSort }) {
  const [activeColumn, setActiveColumn] = useState(columns[0] ?? null)
  const [sortDirection, setSortDirection] = useState('ascending')

  function handleColumnHeaderClick(column) {
    if (activeColumn === column) {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending')
    } else {
      setActiveColumn(column)
      setSortDirection('ascending')
    }
  }

  function defaultSort(a, b) {
    if (a[activeColumn] < b[activeColumn]) return sortDirection === 'ascending' ? -1 : 1
    if (a[activeColumn] > b[activeColumn]) return sortDirection === 'ascending' ? 1 : -1
    return 0
  }

  return (
    <>
      <TableRow className="bg-primary-subtle">
        {columns.map((col, idx) => (
          <TableCol key={idx}>
            <RubricTitle
              title={schema?.properties[col]?.hebrew ?? col}
              active={activeColumn === col}
              sortType={sortDirection}
              onClick={() => handleColumnHeaderClick(col)}
              sortable={true}
            />
          </TableCol>
        ))}
      </TableRow>
      <Scrollable className="bg-body-secondary">
        {entries?.length > 0 ? (
          entries
            .sort(
              customSort
                ? customSort[activeColumn]
                  ? customSort[activeColumn](sortDirection)
                  : defaultSort
                : defaultSort
            )
            .map((entry, idx) => (
              <ContextMenu
                key={idx}
                title={labelFn(entry)}
                options={[
                  { label: 'ערוך', icon: <FaEdit />, onClick: () => onEdit(entry) },
                  {
                    label: 'מחק',
                    icon: <FaTrash />,
                    onClick: () => onDelete(entry),
                    className: 'text-danger'
                  }
                ]}
              >
                <TableDataRow className="bg-body">
                  {columns.map((col, idx) => (
                    <TableCol key={idx}>
                      {(() => {
                        const value = entry[col]
                        if (Array.isArray(value)) {
                          return value.map((item) => schema[col][item]).join(', ')
                        } else {
                          return schema[col][value] ?? value
                        }
                      })()}
                    </TableCol>
                  ))}
                </TableDataRow>
              </ContextMenu>
            ))
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
