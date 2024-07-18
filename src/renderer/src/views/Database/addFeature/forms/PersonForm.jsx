import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import { Form, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import SelectFormGroup from './SelectFormGroup.jsx'
import TextFormGroup from './TextFormGroup.jsx'
import labels_ from '#src/labels.json'
import { HEBREW_REGEX, SERVICE_NUMBER_REGEX } from './common.js'

const FormRow = styled(Row)`
  margin-bottom: 10px;
`
const SCHEMA = yup.object().shape({
  affiliation: yup.string().notOneOf(['0']).required(),
  first_name: yup.string().required().matches(HEBREW_REGEX),
  last_name: yup.string().required().matches(HEBREW_REGEX),
  sex: yup.string().notOneOf(['0']).required(),
  service_number: yup.string().required().matches(SERVICE_NUMBER_REGEX),
  service_type: yup.string().notOneOf(['0']).required(),
  rank: yup.string().notOneOf(['0']).required(),
  active_role: yup.string().notOneOf(['0']).required()
})
const DEFAULT_VALUES = {
  affiliation: '0',
  first_name: '',
  last_name: '',
  sex: '0',
  service_number: '',
  service_type: '0',
  rank: '0',
  profession: [],
  role: '0'
}
const LABELS = labels_?.person

const PersonForm = forwardRef(({ takenIds = [], initValues, onSubmit }, ref) => {
  const isMounted = useRef(false)
  const [schema, setSchema] = useState(SCHEMA)
  useEffect(() => {
    if (takenIds.length > 0) {
      setSchema((defaultSchema) =>
        defaultSchema.shape({
          ...defaultSchema.fields,
          service_number: yup.string().required().matches(SERVICE_NUMBER_REGEX).notOneOf(takenIds)
        })
      )
    }
  }, [takenIds])

  return (
    <Formik
      validationSchema={schema}
      initialValues={initValues ? initValues : DEFAULT_VALUES}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        setFieldValue,
        submitCount,
        submitForm
      }) => {
        useImperativeHandle(ref, () => ({
          submitForm: () => submitForm()
        }))
        // TODO Prevent the below useEffects on component first-time load
        useEffect(() => {
          if (isMounted.current) {
            setFieldValue('rank', '0')
            setFieldValue('active_role', '0')
          }
        }, [values.service_type, setFieldValue])
        useEffect(() => {
          if (isMounted.current) {
            setFieldValue('active_role', '0')
          }
        }, [values.rank, setFieldValue])
        useEffect(() => {
          isMounted.current = true
        }, [])

        return (
          <Form noValidate onSubmit={handleSubmit}>
            <FormRow>
              <TextFormGroup
                name="service_number"
                values={values}
                labels={LABELS}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                additionalValidations={[]}
                submitCount={submitCount}
              />
            </FormRow>
            <FormRow>
              <TextFormGroup
                name="first_name"
                values={values}
                labels={LABELS}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                submitCount={submitCount}
              />
            </FormRow>
            <FormRow>
              <TextFormGroup
                name="last_name"
                values={values}
                labels={LABELS}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                submitCount={submitCount}
              />
            </FormRow>
            <FormRow>
              <SelectFormGroup
                name="sex"
                values={values}
                labels={LABELS}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                submitCount={submitCount}
              />
            </FormRow>
            <FormRow>
              <SelectFormGroup
                name="service_type"
                values={values}
                labels={LABELS}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                submitCount={submitCount}
              />
            </FormRow>
            <FormRow>
              <SelectFormGroup
                name="rank"
                values={values}
                labels={LABELS}
                labelAbbreivated={true}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                submitCount={submitCount}
                additionalValidations={[values.service_type !== '0']}
                additionalOptionFilters={[
                  (key) => {
                    if (values.service_type === 'enlisted') {
                      return key.startsWith('e') && key[1] <= '3'
                    } else if (values.service_type === 'nco') {
                      return key.startsWith('e') && key[1] >= '3'
                    } else {
                      return key.startsWith('o') // Officer
                    }
                  }
                ]}
                disabled={values.service_type === '0'}
              />
            </FormRow>
            <FormRow>
              <SelectFormGroup
                name="active_role"
                values={values}
                labels={LABELS}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                submitCount={submitCount}
                disabled={!(values.rank !== '0' && values.service_type !== '0')}
              />
            </FormRow>
            <FormRow>
              <SelectFormGroup
                name="affiliation"
                values={values}
                labels={LABELS}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                submitCount={submitCount}
              />
            </FormRow>
          </Form>
        )
      }}
    </Formik>
  )
})

PersonForm.displayName = 'PersonForm'
PersonForm.propTypes = {
  initValues: PropTypes.object,
  onSubmit: PropTypes.func
}

export default PersonForm
