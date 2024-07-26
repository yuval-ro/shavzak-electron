import { Form } from 'react-bootstrap'

import labels from '#src/labels.json'

// TODO https://react-select.com/home#getting-started

export default function TaskSelect({
  shifts,
  options,
  idx,
  value,
  onChange,
  isSelectDisabled,
  isOptionDisabled
}) {
  function classify(idx, person) {
    if (
      (shifts[idx - 1] && shifts[idx - 1].assigned.includes(person._id)) ||
      (shifts[idx + 1] && shifts[idx + 1].assigned.includes(person._id))
    ) {
      return 'red'
    } else if (
      (shifts[idx - 2] && shifts[idx - 2].assigned.includes(person._id)) ||
      (shifts[idx + 2] && shifts[idx + 2].assigned.includes(person._id))
    ) {
      return 'yellow'
    } else {
      return 'green'
    }
  }

  function sortFn(a, b) {
    const colorOrder = ['green', 'yellow', 'red']
    const colorA = colorOrder.indexOf(classify(idx, a))
    const colorB = colorOrder.indexOf(classify(idx, b))

    if (colorA === colorB) {
      return a.last_name.localeCompare(b.last_name)
    }
    return colorA - colorB
  }

  return (
    <Form.Select
      value={value}
      onChange={onChange}
      disabled={isSelectDisabled ? isSelectDisabled(idx) : false}
    >
      <option value="0"></option>
      {options.sort(sortFn).map((person) => (
        <option
          key={person._id} // Use service_number as the key
          value={person.service_number}
          disabled={isOptionDisabled ? isOptionDisabled(shifts[idx]._id, person._id) : false}
          className={(() => {
            if (isOptionDisabled(shifts[idx]._id, person._id)) {
              return ''
            }
            const class_ = classify(idx, person)
            switch (class_) {
              case 'red':
                return 'text-danger bg-danger-subtle'
              case 'yellow':
                return 'bg-warning-subtle'
              case 'green':
              default:
                return 'bg-success-subtle'
            }
          })()}
        >
          {`${labels.person.rank[person.rank][1]} ${person.last_name} ${person.first_name}`}
        </option>
      ))}
    </Form.Select>
  )
}
