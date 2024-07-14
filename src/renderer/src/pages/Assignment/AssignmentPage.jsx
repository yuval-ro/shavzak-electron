import { useState, useEffect } from 'react'
import { Container, Row, Col, Accordion } from 'react-bootstrap'
import styled from 'styled-components'

import HeaderRow from './HeaderRow'
import TaskRow from './TaskRow'
import ControlRow from './ControlRow.jsx'
import { generateShifts, formatShift } from '../../helpers.js'
import labels from '../../hebrew_labels.json'

export default function AssignmentPage({ people }) {
  const [shifts, setShifts] = useState([])
  const [paginationIdx, setPaginationIdx] = useState(0)
  const [colsPerPage, setColsPerPage] = useState(3)

  useEffect(() => {
    setShifts(generateShifts())
  }, [])

  const handleTaskRowChange = ({ idx, task, service_number }) => {
    setShifts((prevShifts) => {
      const newShifts = [...prevShifts]
      newShifts[idx] = {
        ...newShifts[idx],
        [task]: service_number
      }
      return newShifts
    })
  }
  const handleClearButtonClick = (idx) => {
    setShifts((prevShifts) => {
      const newShifts = [...prevShifts]
      if (newShifts[idx]) {
        const updatedShift = {}
        Object.keys(newShifts[idx]).forEach((key) => {
          if (key.startsWith('_')) {
            updatedShift[key] = newShifts[idx][key]
          }
        })
        newShifts[idx] = updatedShift
      }
      return newShifts
    })
  }
  const handleRandomizeButtonClick = (idx) => {
    // TODO Assign a random person to each task, according to restrictions
  }

  function personAlreadyAssigned({ idx, service_number }) {
    return Object.values(shifts[idx]).includes(service_number)
  }
  function isNightShift(idx) {
    return shifts[idx] ? shifts[idx]._type === 'night' : false
  }

  const eligible = {
    guardCommander: (person) => person?.position === 'officer' || person?.role === 'nco_sergeant',
    hapakCommander: (person) => person?.position === 'officer',
    hapakDriver: (person) => person?.role === 'driver',
    hapakRadioman: (person) => person?.role === 'marksman' || person?.role === 'medic',
    hapakTrooper: (person) => person?.role === 'trooper',
    guard: (person) => person?.position === 'enlisted' && person?.role === 'trooper'
  }

  const RowWrapper = styled.div`
    min-height: 50px;
  `

  return (
    <Container fluid style={{ direction: 'rtl' }}>
      <HeaderRow shifts={shifts} startIdx={paginationIdx} length={colsPerPage} />
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Yuval Ha King</Accordion.Header>
          <Accordion.Body>
            <RowWrapper>
              <ControlRow
                shifts={shifts}
                startIdx={paginationIdx * colsPerPage}
                length={colsPerPage}
                onClearButtonClick={handleClearButtonClick}
              />
            </RowWrapper>
            <RowWrapper>
              <TaskRow
                options={people.filter(eligible.guard)}
                shifts={shifts}
                taskName="guardNorth"
                taskLabel={labels.task['guardNorth']}
                length={colsPerPage}
                onChange={handleTaskRowChange}
                isOptionDisabled={personAlreadyAssigned}
                perCell={1}
                bgColor="#f9dcdb"
              />
            </RowWrapper>
            <RowWrapper>
              <TaskRow
                options={people.filter(eligible.guard)}
                shifts={shifts}
                taskName="guardGate"
                taskLabel={labels.task['guardGate']}
                length={colsPerPage}
                onChange={handleTaskRowChange}
                isOptionDisabled={personAlreadyAssigned}
                perCell={2}
                bgColor="#e0f7cf"
              />
            </RowWrapper>
            <RowWrapper>
              <TaskRow
                options={people.filter(eligible.guard)}
                shifts={shifts}
                taskName="guardSouth"
                taskLabel={labels.task['guardSouth']}
                length={colsPerPage}
                onChange={handleTaskRowChange}
                isOptionDisabled={personAlreadyAssigned}
                perCell={1}
                bgColor="#d1bbf9"
              />
            </RowWrapper>
            <RowWrapper>
              <TaskRow
                options={people.filter(eligible.guard)}
                shifts={shifts}
                taskName="guardPatrol"
                taskLabel={labels.task['guardPatrol']}
                length={colsPerPage}
                onChange={handleTaskRowChange}
                isOptionDisabled={personAlreadyAssigned}
                perCell={2}
                bgColor="#f9e593"
              />
            </RowWrapper>
            <RowWrapper>
              <TaskRow
                options={people.filter(eligible.guard)}
                shifts={shifts}
                taskName="guardM2"
                taskLabel={labels.task['guardM2']}
                length={colsPerPage}
                onChange={handleTaskRowChange}
                isSelectDisabled={isNightShift}
                isOptionDisabled={personAlreadyAssigned}
                perCell={1}
                bgColor="#b1bcce"
              />
            </RowWrapper>
            <RowWrapper>
              <TaskRow
                options={people.filter(eligible.guard)}
                shifts={shifts}
                taskName="guardM5"
                taskLabel={labels.task['guardM5']}
                length={colsPerPage}
                onChange={handleTaskRowChange}
                isSelectDisabled={isNightShift}
                isOptionDisabled={personAlreadyAssigned}
                perCell={1}
                bgColor="#7397d6"
              />
            </RowWrapper>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <RowWrapper>
        <TaskRow
          options={people.filter(eligible.hapakCommander)}
          shifts={shifts}
          taskName="taskCommander"
          taskLabel={labels.hapakCommander}
          length={colsPerPage}
          onChange={handleTaskRowChange}
          isOptionDisabled={personAlreadyAssigned}
          perCell={2}
        />
      </RowWrapper>
      <RowWrapper>
        <TaskRow
          options={people.filter(eligible.hapakDriver)}
          shifts={shifts}
          taskName="driver"
          taskLabel={labels.hapakDriver}
          length={colsPerPage}
          onChange={handleTaskRowChange}
          isOptionDisabled={personAlreadyAssigned}
          perCell={2}
        />
      </RowWrapper>
      <RowWrapper>
        <TaskRow
          options={people.filter(eligible.hapakRadioman)}
          shifts={shifts}
          taskName="hapakRadioman"
          taskLabel={labels.hapakRadioman}
          length={colsPerPage}
          onChange={handleTaskRowChange}
          isOptionDisabled={personAlreadyAssigned}
          perCell={2}
        />
      </RowWrapper>

      <RowWrapper>
        <TaskRow
          options={people.filter(eligible.hapakTrooper)}
          shifts={shifts}
          taskName="hapakTrooper"
          taskLabel={labels.hapakTrooper}
          length={colsPerPage}
          onChange={handleTaskRowChange}
          isOptionDisabled={personAlreadyAssigned}
          perCell={2}
        />
      </RowWrapper>
    </Container>
  )
}
