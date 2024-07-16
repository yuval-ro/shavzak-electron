import { useEffect } from 'react'
import { Form as BSForm, Button, Row, Col } from 'react-bootstrap'
import { Formik } from 'formik'

import { person } from './forms'

export default function VehicleForm({ labels, onSubmit }) {
  return (
    <Formik validationSchema={person.schema} initialValues={person.values} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, handleBlur, values, errors, setFieldValue, submitCount }) => {
        useEffect(() => {
          setFieldValue('rank', '0')
        }, [values.service_type, setFieldValue])
        return (
          <BSForm noValidate onSubmit={handleSubmit}>
            <Row>
              <BSForm.Group as={Col}>
                <BSForm.Label>{labels['plate_number']._title}</BSForm.Label>
                <BSForm.Control
                  name="plate_number"
                  type="text"
                  value={values.service_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors.service_number && submitCount > 0}
                  isInvalid={errors.service_number && submitCount > 0}
                />
              </BSForm.Group>
            </Row>

            <Row>
              <BSForm.Group as={Col}>
                <BSForm.Label>{labels['type']._title}</BSForm.Label>
                <BSForm.Select
                  name="type"
                  value={values['type']}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors['type'] && submitCount > 0}
                  isInvalid={errors['type'] && submitCount > 0}
                >
                  <option value="0" />
                  {Object.keys(labels['type'])
                    .filter((key) => !key.startsWith('_'))
                    .map((key, idx) => (
                      <option key={idx} value={key}>
                        {labels['type'][key]}
                      </option>
                    ))}
                </BSForm.Select>
              </BSForm.Group>
            </Row>

            <Row as={Col} style={{ marginTop: '30px' }}>
              <Button type="submit" variant="outline-primary">
                שמור
              </Button>
            </Row>
          </BSForm>
        )
      }}
    </Formik>
  )
}
