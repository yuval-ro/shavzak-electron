import { Row, Col, Form } from 'react-bootstrap'

export default function TextFormGroup({
  name,
  values,
  labels,
  errors,
  handleChange,
  handleBlur,
  submitCount,
  disabled
}) {
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
          isValid={!errors[name] && submitCount > 0}
          isInvalid={errors[name] && submitCount > 0}
        />
      </Col>
    </>
  )
}
