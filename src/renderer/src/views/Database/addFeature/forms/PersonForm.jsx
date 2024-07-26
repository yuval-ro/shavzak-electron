/**
 * @file PersonForm.jsx
 */
import { useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { Formik } from 'formik'
import * as yup from 'yup'
import chroma from 'chroma-js'
import styled from 'styled-components'

import labels from '#src/labels.json'
import requirements from '#src/requirements.json'
import { HEBREW_REGEX, SERVICE_NUMBER_REGEX } from './common.js'

const StyledFormControl = styled(Form.Control)`
  &:focus {
    border-color: lightgray;
    box-shadow: 0 0 0 0.15rem rgba(211, 211, 211, 0.2);
  }
`

const PersonForm = forwardRef(({ takenIds = [], initValues = {}, onSubmit }, ref) => {
  const isMounted = useRef(false)
  const rubrics = {
    affiliation: {
      required: true,
      type: 'select',
      validation: yup.string().trim().required('יש לבחור שיוך כנדרש.'),
      initValue: initValues['affiliation'] ?? null,
      options: () =>
        Object.entries(labels.person.affiliation)
          .filter(([key, val]) => !key.startsWith('_'))
          .map(([key, val]) => ({ value: key, label: val }))
    },
    serviceNumber: {
      required: true,
      type: 'free',
      validation: yup
        .string()
        .trim()
        .required('יש למלא מספר אישי כנדרש.')
        .matches(SERVICE_NUMBER_REGEX, 'מספר אישי צריך להיות רצף ספרות באורך 7 או 8.')
        .notOneOf(takenIds, 'מספר זה כבר קיים במערכת.'), // TODO Add a specific message when notOneOf condition is not met
      initValue: initValues['serviceNumber'] ?? null
    },
    firstName: {
      required: true,
      type: 'free',
      validation: yup
        .string()
        .trim()
        .required('יש למלא שם פרטי כנדרש.')
        .matches(HEBREW_REGEX, 'שם משפחה צריך להיות רצף אותיות בעברית בלבד, ללא רווחים.'),
      initValue: initValues['firstName'] ?? null
    },
    lastName: {
      required: true,
      type: 'free',
      validation: yup
        .string()
        .trim()
        .required('יש למלא שם משפחה כנדרש.')
        .matches(HEBREW_REGEX, 'שם משפחה צריך להיות רצף אותיות בעברית בלבד, ללא רווחים.'),
      initValue: initValues['lastName'] ?? null
    },
    sex: {
      required: true,
      type: 'select',
      validation: yup.string().trim().required('יש לבחור מין כנדרש.'),
      initValue: initValues['sex'] ?? null,
      options: () =>
        Object.entries(labels.person.sex)
          .filter(([key, val]) => !key.startsWith('_'))
          .map(([key, val]) => ({ value: key, label: val }))
    },
    serviceType: {
      required: true,
      type: 'select',
      validation: yup.string().trim().required('יש לבחור את סוג השירות כנדרש.'),
      initValue: initValues['serviceType'] ?? null,
      options: () =>
        Object.entries(labels.person.serviceType)
          .filter(([key, val]) => !key.startsWith('_'))
          .map(([key, val]) => ({ value: key, label: val }))
    },
    rank: {
      required: true,
      type: 'select',
      validation: yup.string().trim().required('יש לבחור את הדרגה כנדרש.'),
      initValue: initValues['rank'] ?? null,
      options: ({ serviceType }) =>
        Object.entries(labels.person.rank)
          .filter(([key, val]) => !key.startsWith('_'))
          .filter(([key, val]) => {
            switch (serviceType) {
              case 'enlisted':
                return key.startsWith('e') && key >= 'e1' && key <= 'e3'
              case 'nco':
                return key.startsWith('e') && key >= 'e3'
              case 'officer':
                return key.startsWith('o')
            }
          })
          .map(([key, val]) => ({ value: key, label: val })),
      disabled: ({ serviceType }) => !serviceType
    },
    activeRole: {
      required: true,
      type: 'select',
      validation: yup.string().trim().required('יש לבחור את התפקיד כנדרש.'),
      initValue: initValues['rank'] ?? null,
      options: ({ serviceType, rank }) =>
        Object.entries(labels.person.activeRole)
          .filter(([key, val]) => !key.startsWith('_'))
          .filter(([key, val]) => {
            switch (serviceType) {
              case 'enlisted':
                return true // TODO
              case 'nco':
                return true // TODO
              case 'officer':
                return true // TODO
            }
          })
          .map(([key, val]) => ({ value: key, label: val })),
      disabled: ({ serviceType, rank }) => !(serviceType && rank)
    },
    professions: {
      required: false,
      type: 'multiselect',
      validation: yup.array().of(yup.string()),
      initValue: initValues['professions'] ?? null,
      options: () =>
        Object.entries(labels.person.professions)
          .filter(([key, val]) => !key.startsWith('_'))
          .map(([key, val]) => ({ value: key, label: val }))
    },
    licenses: {
      required: false,
      type: 'multiselect',
      // validation: yup
      //   .array()
      //   .of(yup.string())
      //   .when('professions', {
      //     is: (professions) => professions &&professions.includes('driver'),
      //     then: yup.array().of(yup.string()).required(),
      //     otherwise: yup.array().of(yup.string())
      //   }),
      initValue: initValues['licenses'] ?? null,
      options: () =>
        Object.entries(labels.person.licenses)
          .filter(([key, val]) => !key.startsWith('_'))
          .map(([key, val]) => ({ value: key, label: val }))
    }
  }
  return (
    <Formik
      initialValues={Object.fromEntries(
        Object.entries(rubrics).map(([key, rubric]) => [key, rubric.initValue])
      )}
      validationSchema={yup
        .object()
        .shape(
          Object.fromEntries(
            Object.entries(rubrics).map(([key, rubric]) => [key, rubric.validation])
          )
        )}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        values,
        errors,
        setFieldValue,
        submitCount,
        submitForm,
        initialValues
      }) => {
        useImperativeHandle(ref, () => ({
          submitForm: () => submitForm()
        }))
        useEffect(() => {
          if (isMounted.current) {
            setFieldValue('rank', '')
            setFieldValue('activeRole', '')
          }
        }, [values.serviceType, setFieldValue])
        useEffect(() => {
          if (isMounted.current) {
            setFieldValue('activeRole', '')
          }
        }, [values.rank, setFieldValue])
        useEffect(() => {
          isMounted.current = true
        }, [])
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <div className="small my-1">
              <span>שדות המסומנים בכוכבית (</span>
              <span className="text-danger">*</span>
              <span>) הינם שדות חובה.</span>
            </div>
            {Object.entries(rubrics).map(([key, rubric], idx) => {
              if (rubric.options) {
                var options = rubric.options(values) ?? []
              }
              const error = errors[key]
              const value = values[key]
              const showFeedback = submitCount > 0 && rubric.required
              const boxShadow = `0 0 0 0.15rem ${chroma(showFeedback ? (error ? 'red' : 'green') : 'lightgray').alpha(0.2)}`
              const borderColor = chroma(
                showFeedback ? (error ? 'red' : 'green') : 'lightgray'
              ).css()
              const selectStyles = {
                control: (styles, { isFocused }) => ({
                  ...styles,
                  borderColor: borderColor,
                  boxShadow: isFocused ? boxShadow : styles.boxShadow,
                  '&:hover': {
                    borderColor: borderColor // Change border color on hover if focused
                  }
                }),
                option: (styles, { isFocused, isSelected }) => ({
                  ...styles,
                  backgroundColor: isFocused && !isSelected ? '#f2f2f2' : styles.backgroundColor
                })
              }
              return (
                <Row
                  key={key}
                  style={{
                    borderBottom:
                      idx < Object.entries(rubrics).length - 1 ? '1px solid lightgray' : '',
                    paddingTop: '5px',
                    paddingBottom: '5px'
                  }}
                >
                  <Col
                    xs={3}
                    style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}
                  >
                    {labels.person[key]._title}{' '}
                    {rubric.required ? <span className="text-danger">*</span> : null}
                  </Col>
                  <Col style={{ alignContent: 'center' }}>
                    {(() => {
                      switch (rubric.type) {
                        case 'free':
                          return (
                            <StyledFormControl
                              disabled={false}
                              type="text"
                              value={values[key]}
                              onChange={(event) => setFieldValue(key, event?.target?.value)}
                              isValid={showFeedback && !error}
                              isInvalid={showFeedback && error}
                            />
                          )
                        case 'select':
                          return (
                            <Select
                              isClearable={true}
                              isMulti={false}
                              value={options.find((option) => option.value === values[key]) ?? null}
                              options={rubric.options(values) ?? []}
                              isDisabled={false}
                              onChange={(option) => setFieldValue(key, option?.value ?? null)}
                              isRtl={true}
                              placeholder="בחר..."
                              styles={selectStyles}
                              isDisabled={rubric.disabled && rubric.disabled(values)}
                            />
                          )
                        case 'multiselect':
                          return (
                            <Select
                              isClearable={true}
                              isMulti={true}
                              values={options.filter((option) => option.value === values[key])}
                              options={rubric.options(values) ?? []}
                              isDisabled={false}
                              onChange={(selectedOptions) =>
                                setFieldValue(
                                  key,
                                  selectedOptions?.map((option) => option.value) ?? null
                                )
                              }
                              isRtl={true}
                              placeholder="בחר..."
                              styles={selectStyles}
                              isDisabled={rubric.disabled && rubric.disabled(values)}
                            />
                          )
                        default:
                          return null
                      }
                    })()}
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ display: showFeedback && errors[key] ? 'block' : 'none' }}
                    >
                      {errors[key]}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              )
            })}
            <button onClick={() => console.debug({ values })}>Click</button>
          </Form>
        )
      }}
    </Formik>
  )
})

PersonForm.displayName = 'PersonForm'

export default PersonForm
