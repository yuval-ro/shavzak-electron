import { Form, Row, Col } from 'react-bootstrap'

export default function SelectFormGroup({
  name,
  values,
  labels,
  errors,
  handleChange,
  handleBlur,
  submitCount,
  disabled,
  additionalValidations = [],
  additionalOptionFilters = [],
  labelAbbreivated = false
}) {
  // Determine if the field is valid based on additional validations
  const isValid = () => {
    if (submitCount > 0 && !errors[name]) {
      return additionalValidations.every((i) => i === true)
    }
    return false
  }

  // Determine if the field is invalid based on additional validations
  const isInvalid = () => {
    if (submitCount > 0 && errors[name]) {
      return true
    }
    if (submitCount > 0 && !errors[name]) {
      return additionalValidations.some((i) => i === false)
    }
    return false
  }

  // Apply additional filters to the options
  const filteredOptions = Object.keys(labels[name])
    .filter((key) => !key.startsWith('_')) // Existing filter condition
    .filter((key) => {
      // Apply all additional option filters
      return additionalOptionFilters.every((filter) => filter(key))
    })

  return (
    <>
      <Col xs={3} style={{ textAlign: 'center' }}>
        {labels[name]._title}
      </Col>
      <Col style={{ alignContent: 'center' }}>
        <Form.Select
          disabled={disabled}
          name={name}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={isValid()}
          isInvalid={isInvalid()}
        >
          <option value="0" />
          {filteredOptions.map((key, idx) => (
            <option key={idx} value={key}>
              {(() => {
                var label = labels[name][key]
                if (Array.isArray(label)) {
                  label = labelAbbreivated ? label[1] ?? label[0] : label[0]
                }
                return label
              })()}
            </option>
          ))}
        </Form.Select>
      </Col>
    </>
  )
}
