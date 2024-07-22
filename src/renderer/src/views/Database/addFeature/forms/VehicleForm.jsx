import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Form, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'

import SelectFormGroup from './SelectFormGroup'
import TextFormGroup from './TextFormGroup'
import labels_ from '#src/labels.json'

const FormRow = styled(Row)`
  margin-bottom: 10px;
`
const PLATE_NUMBER_REGEX = /^[\u0590-\u05FF-0-9]*$/
const NICKNAME = /^[\u0590-\u05FF 0-9]*$/
const DEFAULT_SCHEMA = yup.object().shape({
  plate_number: yup.string().matches(PLATE_NUMBER_REGEX).required(),
  type: yup.string().notOneOf(['0']).required(),
  nickname: yup.string().matches(NICKNAME)
})
const DEFAULT_VALUES = {
  plate_number: '',
  type: '0',
  nickname: ''
}
const LABELS = labels_?.vehicle

const VehicleForm = forwardRef(({ takenIds = [], initValues, onSubmit }, ref) => {
  const [schema, setSchema] = useState(DEFAULT_SCHEMA)
  useEffect(() => {
    if (takenIds.length > 0) {
      setSchema((defaultSchema) =>
        defaultSchema.shape({
          ...defaultSchema.fields,
          plate_number: yup.string().matches(PLATE_NUMBER_REGEX).required().notOneOf(takenIds)
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
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <FormRow>
              <TextFormGroup
                name="plate_number"
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
                name="type"
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
                name="nickname"
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

VehicleForm.displayName = 'VehicleForm'

export default VehicleForm
