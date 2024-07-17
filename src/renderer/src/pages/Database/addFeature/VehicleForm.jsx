import { forwardRef, useImperativeHandle } from 'react'
import { Form, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import SelectFormGroup from './SelectFormGroup'
import TextFormGroup from './TextFormGroup'
import * as yup from 'yup'

import styled from 'styled-components'

const FormRow = styled(Row)`
  margin-bottom: 10px;
`
const hebrew = /^[\u0590-\u05FF-]*$/
const plate_number = /^\d{3}-\d{3}$|^\d{2}-\d{3}-\d{2}$|^\d{3}-\d{2}-\d{3}$/
const validationSchema = yup.object().shape({
  plate_number: yup.string().matches(plate_number).required(),
  type: yup.string().notOneOf(['0']).required(),
  nickname: yup.string().required().matches(hebrew)
})
const initialValues = {
  plate_number: '',
  type: '0',
  nickname: ''
}

const VehicleForm = forwardRef(({ labels, onSubmit }, ref) => {
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
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
                labels={labels}
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
                labels={labels}
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
                labels={labels}
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
