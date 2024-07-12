import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TaskRow from './components/TaskRow'
import ControlRow from './components/ControlRow'
import HeaderRow from './components/HeaderRow'
import { generateShifts, formatShift } from './helpers.js'
import styled from 'styled-components'

export default function App() {
  const [people, setPeople] = useState([])
  const [shifts, setShifts] = useState([])
  const [paginationIdx, setPaginationIdx] = useState(0)
  const [colsPerPage, setColsPerPage] = useState(3)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await window.api.getUsers()
        setPeople(fetchedUsers)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }
    fetchUsers()
  }, [])
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

  function personAlreadyAssigned({ idx, service_number }) {
    return Object.values(shifts[idx]).includes(service_number)
  }
  function isNightShift(idx) {
    shifts[idx] ? shifts[idx]._type === 'night' : false
  }

  const eligible = {
    supervisor: (person) => person?.position === 'officer' || person?.role === 'sergeant',
    guard: (person) => person?.position === 'enlisted' && person?.role === 'trooper'
  }

  const RowWrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
  `

  return (
    <Container fluid="sm">
      <HeaderRow shifts={shifts} startIdx={paginationIdx * colsPerPage} length={colsPerPage} />
      <RowWrapper>
        <TaskRow
          options={people.filter(eligible.supervisor)}
          shifts={shifts}
          taskName="supervisor"
          taskLabel="Supervisor"
          length={colsPerPage}
          onChange={handleTaskRowChange}
          isOptionDisabled={personAlreadyAssigned}
          perCell={1}
        />
      </RowWrapper>
      <RowWrapper>
        <TaskRow
          options={people.filter(eligible.guard)}
          shifts={shifts}
          taskName="gate"
          taskLabel="Gate"
          length={colsPerPage}
          onChange={handleTaskRowChange}
          isOptionDisabled={personAlreadyAssigned}
          perCell={2}
        />
      </RowWrapper>
      <RowWrapper>
        <TaskRow
          options={people.filter(eligible.guard)}
          shifts={shifts}
          taskName="south"
          taskLabel="South"
          length={colsPerPage}
          onChange={handleTaskRowChange}
          isOptionDisabled={personAlreadyAssigned}
          perCell={1}
        />
      </RowWrapper>
      <RowWrapper>
        <TaskRow
          options={people.filter(eligible.guard)}
          shifts={shifts}
          taskName="patrol"
          taskLabel="Patrol"
          length={colsPerPage}
          onChange={handleTaskRowChange}
          isOptionDisabled={personAlreadyAssigned}
          perCell={2}
        />
      </RowWrapper>
      <RowWrapper>
        <TaskRow
          options={people.filter(eligible.guard)}
          shifts={shifts}
          taskName="m2"
          taskLabel="M-2"
          length={colsPerPage}
          onChange={handleTaskRowChange}
          isSelectDisabled={isNightShift}
          isOptionDisabled={personAlreadyAssigned}
          perCell={1}
        />
      </RowWrapper>
      <RowWrapper>
        <TaskRow
          options={people.filter(eligible.guard)}
          shifts={shifts}
          taskName="m5"
          taskLabel="M-5"
          length={colsPerPage}
          onChange={handleTaskRowChange}
          isSelectDisabled={isNightShift}
          isOptionDisabled={personAlreadyAssigned}
          perCell={1}
        />
      </RowWrapper>
      <RowWrapper>
        <ControlRow
          shifts={shifts}
          startIdx={paginationIdx * colsPerPage}
          length={colsPerPage}
          onClearButtonClick={handleClearButtonClick}
        />
      </RowWrapper>
    </Container>
  )
}
