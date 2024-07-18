import { Col, Form } from 'react-bootstrap'

export default function TextFormGroup({
  name,
  values,
  labels,
  errors,
  handleChange,
  handleBlur,
  submitCount,
  additionalValidations = [],
  disabled
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
  return (
    <>
      <Col xs={3} style={{ textAlign: 'center' }}>
        {labels[name]._title}
      </Col>
      <Col style={{ alignContent: 'center' }}>
        <Form.Control
          disabled={disabled}
          name={name}
          type="text"
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={isValid()}
          isInvalid={isInvalid()}
        />
      </Col>
    </>
  )
}
