import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

// import HeaderRow from './HeaderRow.jsx'
import TaskRow from './TaskRow/index.js'
import labels from '#src/labels.json'

export default function Main({ data, shifts }) {
  const [pagination, setPagination] = useState(0)
  const [colsPerPage, setColsPerPage] = useState(3)

  function isNightShift(idx) {
    return shifts[idx] ? shifts[idx]._type === 'night' : false
  }
  const handleTaskRowChange = ({ idx, task, service_number }) => {
    // setShifts((prevShifts) => {
    //   const newShifts = [...prevShifts]
    //   newShifts[idx] = {
    //     ...newShifts[idx],
    //     [task]: service_number
    //   }
    //   return newShifts
    // })
  }
  const handleClearButtonClick = (idx) => {
    // setShifts((prevShifts) => {
    //   const newShifts = [...prevShifts]
    //   if (newShifts[idx]) {
    //     const updatedShift = {}
    //     Object.keys(newShifts[idx]).forEach((key) => {
    //       if (key.startsWith('_')) {
    //         updatedShift[key] = newShifts[idx][key]
    //       }
    //     })
    //     newShifts[idx] = updatedShift
    //   }
    //   return newShifts
    // })
  }
  const handleRandomizeButtonClick = (idx) => {
    // TODO Assign a random person to each task, according to restrictions
  }

  function personAlreadyAssigned(shiftId, personId) {
    return shifts.find(shift => shift._id === shiftId).assigned.includes(personId)
  }

  const eligible = {
    guardCommander: (person) =>
      person?.service_type === 'officer' || person?.role === 'nco_sergeant',
    hapakCommander: (person) => person?.service_type === 'officer',
    hapakDriver: (person) => person?.professions === 'driver',
    hapakRadioman: (person) => person?.role === 'marksman' || person?.role === 'medic',
    hapakTrooper: (person) => person?.role === 'trooper',
    guard: (person) => person?.service_type === 'enlisted' && person?.active_role === 'trooper'
  }

  return (
    <div
      style={{
        overflowX: 'hidden',
        border: '1px solid lightgray',
        borderRadius: '8px',
        marginTop: '10px'
      }}
    >
      <Row
        style={{
          backgroundColor: 'lightgray',
          fontWeight: 'bold',
          height: '40px',
          alignItems: 'center'
        }}
        className="mx-0"
      >
        <Col xs={1} />
        {shifts.slice(pagination, pagination + colsPerPage).map((shift, idx) => (
          <Col key={idx} style={{ display: 'flex', flexDirection: 'row' }}>
            {labels.shift.type[shift.type] +
              ' ' +
              shift.time.toLocaleString('he-IL', { day: 'numeric', month: 'numeric' })}
          </Col>
        ))}
      </Row>
      <TaskRow
        options={data.people.filter(eligible.guard)}
        shifts={shifts}
        taskName="guardNorth"
        taskLabel={labels.task['guardNorth']}
        length={colsPerPage}
        onChange={handleTaskRowChange}
        isOptionDisabled={personAlreadyAssigned}
        perCell={1}
      />
      <TaskRow
        options={data.people.filter(eligible.guard)}
        shifts={shifts}
        taskName="guardGate"
        taskLabel={labels.task['guardGate']}
        length={colsPerPage}
        onChange={handleTaskRowChange}
        isOptionDisabled={personAlreadyAssigned}
        perCell={2}
      />
      <TaskRow
        options={data.people.filter(eligible.guard)}
        shifts={shifts}
        taskName="guardSouth"
        taskLabel={labels.task['guardSouth']}
        length={colsPerPage}
        onChange={handleTaskRowChange}
        isOptionDisabled={personAlreadyAssigned}
        perCell={1}
      />
      <TaskRow
        options={data.people.filter(eligible.guard)}
        shifts={shifts}
        taskName="guardPatrol"
        taskLabel={labels.task['guardPatrol']}
        length={colsPerPage}
        onChange={handleTaskRowChange}
        isOptionDisabled={personAlreadyAssigned}
        perCell={2}
      />
      <TaskRow
        options={data.people.filter(eligible.guard)}
        shifts={shifts}
        taskName="guardM2"
        taskLabel={labels.task['guardM2']}
        length={colsPerPage}
        onChange={handleTaskRowChange}
        isSelectDisabled={isNightShift}
        isOptionDisabled={personAlreadyAssigned}
        perCell={1}
      />
      <TaskRow
        options={data.people.filter(eligible.guard)}
        shifts={shifts}
        taskName="guardM5"
        taskLabel={labels.task['guardM5']}
        length={colsPerPage}
        onChange={handleTaskRowChange}
        isSelectDisabled={isNightShift}
        isOptionDisabled={personAlreadyAssigned}
        perCell={1}
      />
    </div>
  )
}
