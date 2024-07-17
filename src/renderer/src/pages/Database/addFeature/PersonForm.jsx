import { useEffect, forwardRef, useImperativeHandle } from 'react'
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
const service_number = /^\d{7}$/
const validationSchema = yup.object().shape({
  affiliation: yup.string().notOneOf(['0']).required(),
  first_name: yup.string().required().matches(hebrew),
  last_name: yup.string().required().matches(hebrew),
  service_number: yup.string().required().matches(service_number),
  service_type: yup.string().notOneOf(['0']).required(),
  rank: yup.string().notOneOf(['0']).required(),
  active_role: yup.string().notOneOf(['0']).required()
})
const initialValues = {
  affiliation: '0',
  first_name: '',
  last_name: '',
  service_number: '',
  service_type: '0',
  rank: '0',
  profession: [],
  role: '0'
}

const PersonForm = forwardRef(({ labels, onSubmit }, ref) => {
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
        useEffect(() => {
          setFieldValue('rank', '0')
          setFieldValue('active_role', '0')
        }, [values.service_type, setFieldValue])
        useEffect(() => {
          setFieldValue('active_role', '0')
        }, [values.rank, setFieldValue])
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <FormRow>
              <TextFormGroup
                name="service_number"
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
                name="first_name"
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
                name="last_name"
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
                name="service_type"
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
                name="rank"
                values={values}
                labels={labels}
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
                labels={labels}
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

PersonForm.displayName = 'PersonForm'

export default PersonForm
