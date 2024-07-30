import { Row, Col } from 'react-bootstrap'
import Select from 'react-select'

export default function TaskRow({
  people,
  shifts,
  labelFn,
  peopleFilter,
  taskName,
  taskLabel,
  startIdx,
  perView,
  onChange,
  limit,
  multi = false
}) {
  function toValue(assigned) {
    if (!assigned) {
      return null
    } else if (Array.isArray(assigned)) {
      return assigned.map((id) => {
        const person = people.find((person) => person._id === id)
        return toOption(person)
      })
    } else {
      const person = people.find((person) => person._id === assigned)
      return toOption(person)
    }
  }
  function toOption(person) {
    return { value: person._id, label: labelFn(person) }
  }
  function isOptionDisabled(shiftIdx, id) {
    var disabled = false
    Object.values(shifts[shiftIdx].assigned).forEach((assignee) => {
      if (Array.isArray(assignee) && assignee.includes(id)) {
        disabled = true
        return
      } else if (assignee === id) {
        disabled = true
        return
      }
    })
    return disabled
  }
  return (
    <Row
      style={{
        paddingTop: '5px',
        paddingBottom: '5px',
        minHeight: '80px',
        borderTop: '1px solid lightgray'
      }}
      className="bg-body-tertiary"
    >
      <Col xs={1} style={{ alignContent: 'center', justifyContent: 'center' }}>
        {taskLabel}
      </Col>
      {shifts.slice(startIdx, startIdx + perView).map((shift, idx) => (
        <Col key={idx} style={{ alignContent: 'center' }}>
          <Select
            value={toValue(shift?.assigned[taskName])}
            isMulti={multi}
            placeholder="חיפוש"
            isClearable={true}
            shifts={shifts}
            options={people
              .filter((person) => shift.available.includes(person._id))
              .filter(peopleFilter)
              .sort((a, b) => {
                if (a.rank > b.rank) {
                  return 1
                } else if (a.rank < b.rank) {
                  return -1
                }
                return 0
              })
              .map((person) => toOption(person))}
            onChange={(selectedOption) => onChange(taskName, shift._id, selectedOption)}
            isOptionDisabled={({ value, label }) =>
              isOptionDisabled(idx, value) ||
              (multi &&
                shift?.assigned[taskName] &&
                Array.isArray(shift.assigned[taskName]) &&
                shift.assigned[taskName].length >= limit)
            }
            hideSelectedOptions={true}
            // isDisabled={
            //   shift?.assigned[taskName] &&
            //   Array.isArray(shift.assigned[taskName]) &&
            //   shift.assigned[taskName].length >= 2
            // }
          />
        </Col>
      ))}
    </Row>
  )
}

// TODO Implement
// function classify(idx, person) {
//   if (
//     (shifts[idx - 1] && shifts[idx - 1].assigned.includes(person._id)) ||
//     (shifts[idx + 1] && shifts[idx + 1].assigned.includes(person._id))
//   ) {
//     return 'red'
//   } else if (
//     (shifts[idx - 2] && shifts[idx - 2].assigned.includes(person._id)) ||
//     (shifts[idx + 2] && shifts[idx + 2].assigned.includes(person._id))
//   ) {
//     return 'yellow'
//   } else {
//     return 'green'
//   }
// }
