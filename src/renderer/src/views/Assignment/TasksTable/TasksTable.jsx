/**
 * @file /src/views/assignment/TasksTable/TasksTable.jsx
 */
import { Row, Col } from 'react-bootstrap'
import { FaEdit, FaTrash, FaBars } from 'react-icons/fa'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'
import styled from 'styled-components'

import ContextMenu from '#src/components/ContextMenu'
import TaskTableRow from './TasksTableRow'

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

export default function TasksTable({ tasks, people, pagination, perView, shifts, onShiftChange }) {
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
    // // FIXME
    // const updatedShift = shifts.find((shift) => shift._id === shiftId)
    // if (Array.isArray(selectedOption)) {
    //   updatedShift.assigned[taskName] = selectedOption.map(({ value }) => value)
    // } else {
    //   updatedShift.assigned[taskName] = selectedOption?.value ?? null
    // }
    // onShiftChange(updatedShift)
  }
  return (
    <div style={{ userSelect: 'none' }}>
      {/* HEADER ROW */}
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
            {shift.type.toString() + // FIXME
              ' ' +
              shift.time.toLocaleString('he-IL', { day: 'numeric', month: 'numeric' })}
          </Col>
        ))}
      </Row>
      {/* DATA ROWS */}
      <SortableWrapper
        useDragHandle
        transitionDuration={0}
        lockAxis="y"
        onSortEnd={
          ({ newIndex, oldIndex }) => {} //FIXME setTasks((tasks) => arrayMoveImmutable(tasks, oldIndex, newIndex))
        }
      >
        {tasks.map(({ name, filter }, idx) => (
          <SortableRow key={idx} index={idx} rowIdx={idx}>
            <Col style={{ alignContent: 'center', maxWidth: '3rem' }}>
              <SortingHandle />
            </Col>
            <Col style={{ alignContent: 'center', maxWidth: '10rem' }}>
              <ContextMenu toggle={<ContextMenu.Link>{name}</ContextMenu.Link>}>
                <ContextMenu.Item label="ערוך" icon={<FaEdit />} />
                <ContextMenu.Item label="מחק" icon={<FaTrash />} />
              </ContextMenu>
              <StyledTaskName>{}</StyledTaskName>
            </Col>
            <TaskTableRow
              people={people}
              shifts={shifts}
              optionFilter={filter}
              taskName={name}
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
