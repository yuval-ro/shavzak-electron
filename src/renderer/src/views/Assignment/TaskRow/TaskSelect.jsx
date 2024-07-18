import { Form } from 'react-bootstrap'

export default function TaskSelect({
  shifts,
  options,
  idx,
  value,
  onChange,
  isSelectDisabled,
  isOptionDisabled
}) {
  function classifyOption({ idx, service_number }) {
    if (
      (shifts[idx - 1] && Object.values(shifts[idx - 1]).includes(service_number)) ||
      (shifts[idx + 1] && Object.values(shifts[idx + 1]).includes(service_number))
    ) {
      return 'red'
    } else if (
      (shifts[idx - 2] && Object.values(shifts[idx - 2]).includes(service_number)) ||
      (shifts[idx + 2] && Object.values(shifts[idx + 2]).includes(service_number))
    ) {
      return 'yellow'
    } else {
      return 'green'
    }
  }

  function getClassName({ idx, service_number }) {
    const class_ = classifyOption({ idx, service_number })
    switch (class_) {
      case 'red':
        return 'text-danger bg-danger-subtle'
      case 'yellow':
        return 'bg-warning-subtle'
      case 'green':
      default:
        return 'bg-success-subtle'
    }
  }

  function sortFn(a, b) {
    const colorOrder = ['green', 'yellow', 'red']
    const colorA = colorOrder.indexOf(classifyOption({ idx, service_number: a.service_number }))
    const colorB = colorOrder.indexOf(classifyOption({ idx, service_number: b.service_number }))

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
      <option></option>
      {options.sort(sortFn).map(({ service_number, first_name, last_name }) => (
        <option
          key={service_number} // Use service_number as the key
          value={service_number}
          disabled={isOptionDisabled ? isOptionDisabled({ idx, service_number }) : false}
          className={
            isOptionDisabled({ idx, service_number }) ? '' : getClassName({ idx, service_number })
          }
        >
          {`${last_name}, ${first_name}`}
        </option>
      ))}
    </Form.Select>
  )
}
