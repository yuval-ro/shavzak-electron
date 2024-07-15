import { useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import labels from '../../../hebrew_labels.json'

export default function AddPersonForm() {
  const hebrew = /^[\u0590-\u05FF-]*$/
  const service_number = /^\d{7}$/
  const schema = yup.object().shape({
    affiliation: yup.string().notOneOf(['0']).required(),
    first_name: yup.string().required().matches(hebrew),
    last_name: yup.string().required().matches(hebrew),
    service_number: yup.string().required().matches(service_number),
    service_type: yup.string().notOneOf(['0']).required(),
    rank: yup.string().notOneOf(['0']).required(),
    role: yup.string().notOneOf(['0']).required()
  })

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        affiliation: '0',
        first_name: '',
        last_name: '',
        service_number: '',
        service_type: '0',
        rank: '0',
        profession: [],
        role: '0'
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors, setFieldValue, submitCount }) => {
        useEffect(() => {
          setFieldValue('rank', '0')
        }, [values.service_type, setFieldValue])
        return (
          <Form noValidate onSubmit={handleSubmit}>
            {/* service number & id number */}
            <Row>
              <Form.Group controlId="form_service_number" as={Col}>
                <Form.Label>מספר אישי</Form.Label>
                <Form.Control
                  name="service_number"
                  type="text"
                  value={values.service_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors.service_number && submitCount > 0}
                  isInvalid={errors.service_number && submitCount > 0}
                />
                {/* <Form.Control.Feedback type="invalid">{errors.last_name_en}</Form.Control.Feedback> */}
              </Form.Group>
            </Row>
            {/* first name & last name */}
            <Row>
              <Form.Group controlId="form_first_name" as={Col}>
                <Form.Label>{labels.person.first_name._title}</Form.Label>
                <Form.Control
                  name="first_name"
                  type="text"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors.first_name && submitCount > 0}
                  isInvalid={errors.first_name && submitCount > 0}
                />
                {/* <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback> */}
              </Form.Group>
              <Form.Group controlId="form_last_name" as={Col}>
                <Form.Label>{labels.person.last_name._title}</Form.Label>
                <Form.Control
                  name="last_name"
                  type="text"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors.last_name && submitCount > 0}
                  isInvalid={errors.last_name && submitCount > 0}
                />
                {/* <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback> */}
              </Form.Group>
            </Row>
            {/* service type & rank*/}
            <Row>
              <Form.Group controlId="form_service_type" as={Col}>
                <Form.Label>סוג שירות</Form.Label>
                <Form.Select
                  name="service_type"
                  value={values.service_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors.service_type && submitCount > 0}
                  isInvalid={errors.service_type && submitCount > 0}
                >
                  <option value="0" />
                  {Object.keys(labels.person.service_type)
                    .filter((key) => !key.startsWith('_'))
                    .map((key, idx) => (
                      <option key={idx} value={key}>
                        {labels.person.service_type[key]}
                      </option>
                    ))}
                </Form.Select>
                {/* <Form.Control.Feedback type="invalid">{errors.service_type}</Form.Control.Feedback> */}
              </Form.Group>
              <Form.Group controlId="form_rank" as={Col}>
                <Form.Label>דרגה</Form.Label>
                <Form.Select
                  name="rank"
                  value={values.rank}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors.rank && values.service_type !== '0' && submitCount > 0}
                  isInvalid={errors.rank && submitCount > 0}
                  disabled={values.service_type === '0'}
                >
                  <option value="0" />
                  {Object.keys(labels.person.rank)
                    .filter((key) => !key.startsWith('_'))
                    .filter((key) => {
                      if (values.service_type === 'enlisted') {
                        return key.startsWith('e') && key[1] <= '3'
                      } else if (values.service_type === 'nco') {
                        return key.startsWith('e') && key[1] >= '3'
                      } else {
                        return key.startsWith('o') // Officer
                      }
                    })
                    .map((key, idx) => (
                      <option key={idx} value={key}>
                        {labels.person.rank[key][0]}
                      </option>
                    ))}
                </Form.Select>
                {/* <Form.Control.Feedback type="invalid">{errors.rank}</Form.Control.Feedback> */}
              </Form.Group>
            </Row>
            {/* affiliation & role */}
            <Row>
              <Form.Group controlId="form_affiliation" as={Col}>
                <Form.Label>{labels.person.affiliation._title}</Form.Label>
                <Form.Select
                  name="affiliation"
                  value={values.affiliation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors.affiliation && submitCount > 0}
                  isInvalid={errors.affiliation && submitCount > 0}
                >
                  <option value="0" />
                  {Object.keys(labels.person.affiliation)
                    .filter((key) => !key.startsWith('_'))
                    .map((key, idx) => (
                      <option key={idx} value={key}>
                        {labels.person.affiliation[key]}
                      </option>
                    ))}
                </Form.Select>
                {/* <Form.Control.Feedback type="invalid">{errors.affiliation}</Form.Control.Feedback> */}
              </Form.Group>
              <Form.Group controlId="form_role" as={Col}>
                <Form.Label>{labels.person.role._title}</Form.Label>
                <Form.Select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={!errors.affiliation && submitCount > 0}
                  isInvalid={errors.affiliation && submitCount > 0}
                >
                  <option value="0" />
                  {Object.keys(labels.person.role)
                    .filter((key) => !key.startsWith('_'))
                    .map((key, idx) => (
                      <option key={idx} value={key}>
                        {labels.person.role[key]}
                      </option>
                    ))}
                </Form.Select>
                {/* <Form.Control.Feedback type="invalid">{errors.affiliation}</Form.Control.Feedback> */}
              </Form.Group>
            </Row>
            {/* role */}
            <Row></Row>
            {/* proffesions */}
            <Row>
              <Form.Group controlId="form_profession" as={Col}>
                <Form.Label>{labels.person.profession._title}</Form.Label>
                {Object.keys(labels.person.profession)
                  .filter((key) => !key.startsWith('_'))
                  .map((key, idx) => (
                    <Form.Check
                      key={idx}
                      id={`checkbox-${key}`}
                      label={labels.person.profession[key]}
                      checked={values.profession.includes(key)} // Check if key exists in profession array
                      onChange={(e) => {
                        const { checked } = e.target
                        if (checked) {
                          // Add profession key to array
                          setFieldValue('profession', [...values.profession, key])
                        } else {
                          // Remove profession key from array
                          setFieldValue(
                            'profession',
                            values.profession.filter((item) => item !== key)
                          )
                        }
                      }}
                    />
                  ))}
              </Form.Group>
            </Row>

            <Row as={Col} style={{ marginTop: '30px' }}>
              <Button type="submit" variant="outline-primary">
                שמור
              </Button>
            </Row>
          </Form>
        )
      }}
    </Formik>
  )
}
