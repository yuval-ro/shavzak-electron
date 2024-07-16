import { useEffect } from 'react'
import { Form as BSForm, Button, Row, Col, FloatingLabel } from 'react-bootstrap'
import { Formik } from 'formik'

import { person } from './forms'

export default function PersonForm({ labels, onSubmit }) {
  return (
    <Formik validationSchema={person.schema} initialValues={person.values} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, handleBlur, values, errors, setFieldValue, submitCount }) => {
        useEffect(() => {
          setFieldValue('rank', '0')
        }, [values.service_type, setFieldValue])
        return (
          <BSForm noValidate onSubmit={handleSubmit}>
            <Row>
              <BSForm.Floating controlId="form_service_number" as={Col}>
                <BSForm.Control
                  name="service_number"
                  type="text"
                  value={values.service_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors.service_number && submitCount > 0}
                  isInvalid={errors.service_number && submitCount > 0}
                />
                <label>{labels['service_number']._title}</label>
              </BSForm.Floating>
            </Row>

            <Row>
              <BSForm.Group controlId="form_first_name" as={Col}>
                <BSForm.Label>{labels['first_name']._title}</BSForm.Label>
                <BSForm.Control
                  name="first_name"
                  type="text"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors.first_name && submitCount > 0}
                  isInvalid={errors.first_name && submitCount > 0}
                />
              </BSForm.Group>
              <BSForm.Group controlId="form_last_name" as={Col}>
                <BSForm.Label>{labels['last_name']._title}</BSForm.Label>
                <BSForm.Control
                  name="last_name"
                  type="text"
                  value={values['last_name']}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors['last_name'] && submitCount > 0}
                  isInvalid={errors['last_name'] && submitCount > 0}
                />
              </BSForm.Group>
            </Row>

            <Row>
              <BSForm.Group controlId="form_service_type" as={Col}>
                <BSForm.Label>סוג שירות</BSForm.Label>
                <BSForm.Select
                  name="service_type"
                  value={values['service_type']}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors['service_type'] && submitCount > 0}
                  isInvalid={errors['service_type'] && submitCount > 0}
                >
                  <option value="0" />
                  {Object.keys(labels['service_type'])
                    .filter((key) => !key.startsWith('_'))
                    .map((key, idx) => (
                      <option key={idx} value={key}>
                        {labels['service_type'][key]}
                      </option>
                    ))}
                </BSForm.Select>
              </BSForm.Group>
              <BSForm.Group controlId="form_rank" as={Col}>
                <BSForm.Label>{labels['rank']._title}</BSForm.Label>
                <BSForm.Select
                  name="rank"
                  value={values['rank']}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors.rank && values.service_type !== '0' && submitCount > 0}
                  isInvalid={errors.rank && submitCount > 0}
                  disabled={values.service_type === '0'}
                >
                  <option value="0" />
                  {Object.keys(labels['rank'])
                    .filter((key) => !key.startsWith('_'))
                    .filter((key) => {
                      if (values['service_type'] === 'enlisted') {
                        return key.startsWith('e') && key[1] <= '3'
                      } else if (values['service_type'] === 'nco') {
                        return key.startsWith('e') && key[1] >= '3'
                      } else {
                        return key.startsWith('o') // Officer
                      }
                    })
                    .map((key, idx) => (
                      <option key={idx} value={key}>
                        {labels['rank'][key][0]}
                      </option>
                    ))}
                </BSForm.Select>
              </BSForm.Group>
            </Row>

            <Row>
              <BSForm.Group controlId="form_affiliation" as={Col}>
                <BSForm.Label>{labels['affiliation']._title}</BSForm.Label>
                <BSForm.Select
                  name="affiliation"
                  value={values['affiliation']}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors['affiliation'] && submitCount > 0}
                  isInvalid={errors['affiliation'] && submitCount > 0}
                >
                  <option value="0" />
                  {Object.keys(labels['affiliation'])
                    .filter((key) => !key.startsWith('_'))
                    .map((key, idx) => (
                      <option key={idx} value={key}>
                        {labels['affiliation'][key]}
                      </option>
                    ))}
                </BSForm.Select>
              </BSForm.Group>
              <BSForm.Group controlId="form_active_role" as={Col}>
                <BSForm.Label>{labels['active_role']._title}</BSForm.Label>
                <BSForm.Select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors['affiliation'] && submitCount > 0}
                  isInvalid={errors['affiliation'] && submitCount > 0}
                >
                  <option value="0" />
                  {Object.keys(labels['active_role'])
                    .filter((key) => !key.startsWith('_'))
                    .map((key, idx) => (
                      <option key={idx} value={key}>
                        {labels['active_role'][key]}
                      </option>
                    ))}
                </BSForm.Select>
              </BSForm.Group>
            </Row>

            <Row>
              <BSForm.Group controlId="form_professions" as={Col}>
                <BSForm.Label>{labels['professions']._title}</BSForm.Label>
                {Object.keys(labels['professions'])
                  .filter((key) => !key.startsWith('_'))
                  .map((key, idx) => (
                    <BSForm.Check
                      key={idx}
                      id={`checkbox-${key}`}
                      label={labels['professions'][key]}
                      checked={values['professions'] ? values['professions'].includes(key) : false} // Check if key exists in profession array
                      onChange={(e) => {
                        const { checked } = e.target
                        if (checked) {
                          // Add profession key to array
                          setFieldValue('professions', [...values['professions'], key])
                        } else {
                          // Remove profession key from array
                          setFieldValue(
                            'professions',
                            values['professions'].filter((item) => item !== key)
                          )
                        }
                      }}
                    />
                  ))}
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
