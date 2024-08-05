import { Col } from 'react-bootstrap'
import Select from 'react-select'
import { ContextMenu } from "#src/components"
import { Person } from '#src/schemas'

export default function TaskTableRow({
  people,
  shifts,
  optionFilter,
  taskName,
  startIdx,
  perView,
  onSelectChange
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
    return { value: person._id, label: Person.stringify(person) }
  }
  return (
    <>
      {shifts.slice(startIdx, startIdx + perView).map((shift, idx) => (
        <Col key={idx} style={{ alignContent: 'center' }}>
          <Select
            menuPortalTarget={document.body}
            menuPosition={'fixed'}
            value={toValue(shift?.assigned[taskName])}
            isMulti={true}
            placeholder="חיפוש"
            isClearable={true}
            shifts={shifts}
            options={people
              .filter((person) => shift.available.includes(person._id))
              // .filter(optionFilter) // FIXME
              .sort((a, b) => {
                if (a.rank > b.rank) {
                  return 1
                } else if (a.rank < b.rank) {
                  return -1
                }
                return 0
              })
              .map((person) => toOption(person))}
            onChange={(selectedOption) => onSelectChange(taskName, shift._id, selectedOption)}
            hideSelectedOptions={true}
          />
        </Col>
      ))}
    </>
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
