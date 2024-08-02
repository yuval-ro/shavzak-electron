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

export default function Table({
  collection,
  rubricNames,
  entries,
  labels,
  labelFn,
  onEdit,
  onDelete,
  customSort
}) {
  const [activeRubric, setActiveRubric] = useState(rubricNames[0] ?? null) // which rubric is the one the entries being sorted by
  const [sortDirection, setSortDirection] = useState('ascending') // or 'descending'

  function handleRubricClick(rubric) {
    if (activeRubric === rubric) {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending')
    } else {
      setActiveRubric(rubric)
      setSortDirection('ascending')
    }
  }

  function defaultSort(a, b) {
    if (a[activeRubric] < b[activeRubric]) return sortDirection === 'ascending' ? -1 : 1
    if (a[activeRubric] > b[activeRubric]) return sortDirection === 'ascending' ? 1 : -1
    return 0
  }

  return (
    <>
      <TableRow className="bg-primary-subtle">
        {rubricNames.map((rubricName, idx) => (
          <TableCol key={idx}>
            <RubricTitle
              title={labels[rubricName]._title}
              active={activeRubric === rubricName}
              sortType={sortDirection}
              onClick={() => handleRubricClick(rubricName)}
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
                ? customSort[activeRubric]
                  ? customSort[activeRubric](sortDirection)
                  : defaultSort
                : defaultSort
            )
            .map((entry, idx) => (
              <ContextMenu
                key={idx}
                title={labelFn(entry)}
                options={[
                  { label: 'ערוך', icon: <FaEdit />, onClick: () => onEdit(collection, entry) },
                  {
                    label: 'מחק',
                    icon: <FaTrash />,
                    onClick: () => onDelete(collection, entry),
                    className: 'text-danger'
                  }
                ]}
              >
                <TableDataRow className="bg-body">
                  {rubricNames.map((rubricName, idx) => (
                    <TableCol key={idx}>
                      {(() => {
                        const value = entry[rubricName]
                        if (Array.isArray(value)) {
                          return value.map((item) => labels[rubricName][item]).join(', ')
                        } else {
                          return labels[rubricName][value] ?? value
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
