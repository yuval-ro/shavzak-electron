import { useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import labels from '../../../hebrew_labels.json'

export default function AddPersonForm() {
  const hebrew = /^[\u0590-\u05FF-]*$/
  const english = /^[A-Za-z-]+$/
  const schema = yup.object().shape({
    unit: yup.string().notOneOf(['0']).required(),
    first_name_he: yup.string().required().matches(hebrew),
    first_name_en: yup.string().required().matches(english),
    last_name_he: yup.string().required().matches(hebrew),
    last_name_en: yup.string().required().matches(english),
    position: yup.string().notOneOf(['0']).required(),
    rank: yup.string().notOneOf(['0']).required()
  })

  const headerRow = [
    'unit',
    'first_name_he',
    'first_name_en',
    'last_name_he',
    'last_name_en',
    'role',
    'position',
    'sex',
    'rank',
    'service_number',
    'id_number'
  ]

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        unit: '0',
        first_name_he: '',
        first_name_en: '',
        last_name_he: '',
        last_name_en: '',
        position: '0',
        rank: '0'
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors, setFieldValue, submitCount }) => {
        useEffect(() => {
          setFieldValue('rank', '0')
        }, [values.position, setFieldValue])
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="form_unit">
              <Form.Label>{labels.props.unit._title}</Form.Label>
              <Form.Select
                name="unit"
                value={values.unit}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={!errors.unit && submitCount > 0}
                isInvalid={errors.unit && submitCount > 0}
              >
                <option value="0" />
                {Object.keys(labels.props.unit)
                  .filter((key) => !key.startsWith('_'))
                  .map((key, idx) => (
                    <option key={idx} value={key}>
                      {labels.props.unit[key][0]}
                    </option>
                  ))}
              </Form.Select>
              {/* <Form.Control.Feedback type="invalid">{errors.unit}</Form.Control.Feedback> */}
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="form_first_name_he">
                  <Form.Label>{labels.props.first_name_he._title}</Form.Label>
                  <Form.Control
                    name="first_name_he"
                    type="text"
                    value={values.first_name_he}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={!errors.first_name_he && submitCount > 0}
                    isInvalid={errors.first_name_he && submitCount > 0}
                  />
                  {/* <Form.Control.Feedback type="invalid">{errors.first_name_he}</Form.Control.Feedback> */}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form_first_name_en">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="first_name_en"
                    type="text"
                    value={values.first_name_en}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={!errors.first_name_en && submitCount > 0}
                    isInvalid={errors.first_name_en && submitCount > 0}
                  />
                  {/* <Form.Control.Feedback type="invalid">{errors.first_name_en}</Form.Control.Feedback> */}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="form_last_name_he">
                  <Form.Label>{labels.props.last_name_he._title}</Form.Label>
                  <Form.Control
                    name="last_name_he"
                    type="text"
                    value={values.last_name_he}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={!errors.last_name_he && submitCount > 0}
                    isInvalid={errors.last_name_he && submitCount > 0}
                  />
                  {/* <Form.Control.Feedback type="invalid">{errors.last_name_he}</Form.Control.Feedback> */}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form_last_name_en">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="last_name_en"
                    type="text"
                    value={values.last_name_en}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={!errors.last_name_en && submitCount > 0}
                    isInvalid={errors.last_name_en && submitCount > 0}
                  />
                  {/* <Form.Control.Feedback type="invalid">{errors.last_name_en}</Form.Control.Feedback> */}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Form.Group controlId="form_position" as={Col}>
                <Form.Label>סוג שירות</Form.Label>
                <Form.Select
                  name="position"
                  value={values.position}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors.position && submitCount > 0}
                  isInvalid={errors.position && submitCount > 0}
                >
                  <option value="0" />
                  {Object.keys(labels.props.position)
                    .filter((key) => !key.startsWith('_'))
                    .map((key, idx) => (
                      <option key={idx} value={key}>
                        {labels.props.position[key]}
                      </option>
                    ))}
                </Form.Select>
                {/* <Form.Control.Feedback type="invalid">{errors.position}</Form.Control.Feedback> */}
              </Form.Group>
              <Form.Group controlId="form_rank" as={Col}>
                <Form.Label>דרגה</Form.Label>
                <Form.Select
                  name="rank"
                  value={values.rank}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors.rank && values.position !== '0' && submitCount > 0}
                  isInvalid={errors.rank && submitCount > 0}
                  disabled={values.position === '0'}
                >
                  <option value="0" />
                  {Object.keys(labels.props.rank)
                    .filter((key) => !key.startsWith('_'))
                    .filter((key) => {
                      if (values.position === 'enlisted') {
                        return key.startsWith('e') && key[1] <= '3'
                      } else if (values.position === 'nco') {
                        return key.startsWith('e') && key[1] >= '3'
                      } else {
                        return key.startsWith('o') // Officer
                      }
                    })
                    .map((key, idx) => (
                      <option key={idx} value={key}>
                        {labels.props.rank[key][0]}
                      </option>
                    ))}
                </Form.Select>
                {/* <Form.Control.Feedback type="invalid">{errors.rank}</Form.Control.Feedback> */}
              </Form.Group>
            </Row>
            <Row as={Col} style={{ marginTop: '30px' }}>
              <Button type="submit">Submit</Button>
            </Row>
          </Form>
        )
      }}
    </Formik>
  )
}
