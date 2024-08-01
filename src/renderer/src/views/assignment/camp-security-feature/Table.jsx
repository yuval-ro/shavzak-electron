/**
 * @file /src/views/assignment/camp-security-feature/Table.jsx
 */
import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { FaEdit, FaTrash, FaBars } from 'react-icons/fa'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'
import styled from 'styled-components'

import TableRow from './TableRow'
import labels from '#src/labels.json'
import ContextMenu from '#src/components/ContextMenu.jsx'

const StyledRow = styled(Row)`
  min-height: 5rem;
  border: 1px solid lightgray;
  margin: 0.1rem;
  background-color: #fff;
  transition: background-color 0.3s ease;
  border-radius: 0.3rem;
  &:hover {
    background-color: #f0f0f0;
  }
`
const StyledTaskName = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export default function Table({ pagination, perView, shifts, people, onShiftChange }) {
  const [tasks, setTasks] = useState([
    {
      _id: crypto.randomUUID(),
      displayName: 'מפקד אבטחת מחנה',
      filter: (person) => person.serviceType === 'officer'
    },
    {
      _id: crypto.randomUUID(),
      displayName: 'צפונית',
      filter: (person) => person.serviceType === 'enlisted' && person.activeRole === 'trooper'
    },
    {
      _id: crypto.randomUUID(),
      displayName: 'דרומית',
      filter: (person) => person.serviceType === 'enlisted' && person.activeRole === 'trooper'
    },
    {
      _id: crypto.randomUUID(),
      displayName: 'שג',
      filter: (person) => person.serviceType === 'enlisted' && person.activeRole === 'trooper'
    },
    {
      _id: crypto.randomUUID(),
      displayName: 'פטרול',
      filter: (person) => person.serviceType === 'enlisted' && person.activeRole === 'trooper'
    },
    {
      _id: crypto.randomUUID(),
      displayName: 'מ-2',
      filter: (person) => person.serviceType === 'enlisted' && person.activeRole === 'trooper'
    },
    {
      _id: crypto.randomUUID(),
      displayName: 'מ-5',
      filter: (person) => person.serviceType === 'enlisted' && person.activeRole === 'trooper'
    }
  ])
  const SortingHandle = SortableHandle(() => <FaBars style={{ cursor: 'grab' }} />)
  const SortableWrapper = SortableContainer(({ children }) => <div>{children}</div>)
  const SortableRow = SortableElement(({ children }) => (
    <StyledRow
      style={{
        minHeight: '5rem',
        border: '1px solid lightgray',
        margin: '0.1rem'
      }}
    >
      {children}
    </StyledRow>
  ))
  function handleSelectChange(taskName, shiftId, selectedOption) {
    const updatedShift = shifts.find((shift) => shift._id === shiftId)
    if (Array.isArray(selectedOption)) {
      updatedShift.assigned[taskName] = selectedOption.map(({ value }) => value)
    } else {
      updatedShift.assigned[taskName] = selectedOption?.value ?? null
    }
    onShiftChange(updatedShift)
  }
  function labelFn({ firstName, lastName, rank }) {
    return `${labels.person.rank[rank]} ${firstName} ${lastName}`
  }
  return (
    <div style={{ userSelect: 'none' }}>
      <Row
        className="bg-primary-subtle"
        style={{
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          minHeight: '3rem',
          paddingRight: '1rem'
        }}
      >
        <Col style={{ alignContent: 'center', maxWidth: '3rem' }}></Col>
        <Col style={{ alignContent: 'center', maxWidth: '10rem' }}>משימה</Col>
        {shifts.slice(pagination, pagination + perView).map((shift, idx) => (
          <Col key={idx} style={{ alignContent: 'center' }}>
            {labels.shift.type[shift.type] +
              ' ' +
              shift.time.toLocaleString('he-IL', { day: 'numeric', month: 'numeric' })}
          </Col>
        ))}
      </Row>
      <SortableWrapper
        useDragHandle
        transitionDuration={0}
        lockAxis="y"
        onSortEnd={({ newIndex, oldIndex }) =>
          setTasks((tasks) => arrayMoveImmutable(tasks, oldIndex, newIndex))
        }
      >
        {tasks.map(({ displayName, filter }, idx) => (
          <SortableRow key={idx} index={idx} rowIdx={idx}>
            <Col style={{ alignContent: 'center', maxWidth: '3rem' }}>
              <SortingHandle />
            </Col>
            <Col style={{ alignContent: 'center', maxWidth: '10rem' }}>
              <ContextMenu
                title={displayName}
                options={[
                  { label: 'ערוך', icon: <FaEdit />, onClick: () => {} },
                  {
                    label: 'מחק',
                    icon: <FaTrash />,
                    onClick: () => {},
                    className: 'text-danger'
                  }
                ]}
              >
                <StyledTaskName>{displayName}</StyledTaskName>
              </ContextMenu>
            </Col>
            <TableRow
              people={people}
              shifts={shifts}
              labelFn={labelFn}
              optionFilter={filter}
              taskName={displayName}
              startIdx={pagination}
              perView={perView}
              onSelectChange={handleSelectChange}
            />
          </SortableRow>
        ))}
      </SortableWrapper>
    </div>
  )
}
