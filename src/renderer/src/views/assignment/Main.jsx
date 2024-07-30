import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'

import TaskRow from './camp-security-feature/TaskRow'
import labels from '#src/labels.json'

export default function Main({ data, shifts, onShiftChange }) {
  const [pagination, setPagination] = useState(0)
  const [perView, setPerView] = useState(3)

  const handleTaskRowChange = (taskName, shiftId, selectedOption) => {
    const updatedShift = shifts.find((shift) => shift._id === shiftId)
    if (Array.isArray(selectedOption)) {
      updatedShift.assigned[taskName] = selectedOption.map(({ value }) => value)
    } else {
      updatedShift.assigned[taskName] = selectedOption?.value ?? null
    }
    onShiftChange(updatedShift)
  }
  const labelFns = {
    person: ({ firstName, lastName, rank }) =>
      `${labels.person.rank[rank]} ${firstName} ${lastName}`
  }

  return (
    <>
      <Row className="bg-primary-subtle" style={{ height: '50px' }}>
        <Col xs={1} />
        {shifts.slice(pagination, pagination + perView).map((shift, idx) => (
          <Col key={idx} style={{ alignContent: 'center' }}>
            {labels.shift.type[shift.type] +
              ' ' +
              shift.time.toLocaleString('he-IL', { day: 'numeric', month: 'numeric' })}
          </Col>
        ))}
      </Row>
      <TaskRow
        people={data?.people}
        labelFn={labelFns.person}
        shifts={shifts}
        peopleFilter={(person) =>
          person.serviceType === 'enlisted' && person.activeRole === 'trooper'
        }
        taskName="guardNorth"
        taskLabel={labels.task['guardNorth']}
        startIdx={pagination}
        perView={perView}
        onChange={handleTaskRowChange}
      />
      <TaskRow
        people={data?.people}
        labelFn={labelFns.person}
        shifts={shifts}
        peopleFilter={(person) =>
          person.serviceType === 'enlisted' && person.activeRole === 'trooper'
        }
        taskName="guardSouth"
        taskLabel={labels.task['guardSouth']}
        startIdx={pagination}
        perView={perView}
        onChange={handleTaskRowChange}
      />
      <TaskRow
        multi={true}
        limit={2}
        people={data?.people}
        labelFn={labelFns.person}
        shifts={shifts}
        peopleFilter={(person) =>
          person.serviceType === 'enlisted' && person.activeRole === 'trooper'
        }
        taskName="guardGate"
        taskLabel={labels.task['guardGate']}
        startIdx={pagination}
        perView={perView}
        onChange={handleTaskRowChange}
      />
      <TaskRow
        multi={true}
        limit={2}
        people={data?.people}
        labelFn={labelFns.person}
        shifts={shifts}
        peopleFilter={(person) =>
          person.serviceType === 'enlisted' && person.activeRole === 'trooper'
        }
        taskName="guardPatrol"
        taskLabel={labels.task['guardPatrol']}
        startIdx={pagination}
        perView={perView}
        onChange={handleTaskRowChange}
      />
      <TaskRow
        multi={true}
        limit={2}
        people={data?.people}
        labelFn={labelFns.person}
        shifts={shifts}
        peopleFilter={(person) =>
          person.serviceType === 'enlisted' && person.activeRole === 'trooper'
        }
        taskName="guardM2"
        taskLabel={labels.task['guardM2']}
        startIdx={pagination}
        perView={perView}
        onChange={handleTaskRowChange}
      />
      <TaskRow
        multi={true}
        limit={2}
        people={data?.people}
        labelFn={labelFns.person}
        shifts={shifts}
        peopleFilter={(person) =>
          person.serviceType === 'enlisted' && person.activeRole === 'trooper'
        }
        taskName="guardM5"
        taskLabel={labels.task['guardM5']}
        startIdx={pagination}
        perView={perView}
        onChange={handleTaskRowChange}
      />
    </>
  )
}
