/**
 * @file VehicleForm.jsx
 */
import { forwardRef, useImperativeHandle } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { Formik } from 'formik'
import * as yup from 'yup'
import chroma from 'chroma-js'
import styled from 'styled-components'

import labels from '#src/labels.json'

const PLATE_NUMBER_REGEX = /^(?=[\u05E6\u05DE]?)\u05E6?\u05DE?\d{5,8}$/
const NICKNAME_REGEX = /^[\u0590-\u05FF0-9\s]+$/
const BS_DANGER = '#DC3545'
const BS_SUCCESS = '#198754'

const StyledFormControl = styled(Form.Control)`
  &:focus {
    border-color: lightgray;
    box-shadow: 0 0 0 0.25rem rgba(211, 211, 211, 0.2);
  }
`

const VehicleForm = forwardRef(({ takenIds = [], initValues = {}, onSubmit }, ref) => {
  const rubrics = {
    plate: {
      required: true,
      type: 'free',
      validation: yup
        .string()
        .trim()
        .required('יש למלא לוחית זיהוי כנדרש.')
        .matches(
          PLATE_NUMBER_REGEX,
          'לוחית זיהוי צריכה להיות רצף ספרות באורך 5-8, עם אפשרות לתחילית "מ" או "צ".'
        )
        .notOneOf(takenIds, 'לוחית זיהוי שהוקלדה כבר קיימת במערכת!'),
      initValue: initValues?.plate ?? null
    },
    type: {
      required: true,
      type: 'singleSelect',
      validation: yup.string().trim().required('יש לבחור סוג רכב כנדרש.'),
      initValue: initValues?.type ?? null,
      options: () =>
        Object.entries(labels?.vehicle?.type)
          .filter(([key, val]) => !key.startsWith('_'))
          .map(([key, val]) => ({ value: key, label: val }))
    },
    nickname: {
      required: true,
      type: 'free',
      validation: yup
        .string()
        .trim()
        .matches(NICKNAME_REGEX, 'כינוי צריך להיות רצף אותיות בעברית ו/או ספרות.'),
      initValue: initValues?.nickname ?? null
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
              const hidden = rubric.hidden && rubric.hidden(values)
              const value = values[key] ?? initialValues[key]
              const error = errors[key]
              const disabled = rubric.disabled && rubric.disabled(values)
              const showFeedback = submitCount > 0 && rubric.required
              const boxShadow = `0 0 0 0.25rem ${chroma(showFeedback ? (error ? BS_DANGER : BS_SUCCESS) : 'lightgray').alpha(0.2)}`
              const borderColor = chroma(
                showFeedback ? (error ? BS_DANGER : BS_SUCCESS) : 'lightgray'
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
                    paddingBottom: '5px',
                    display: hidden ? 'none' : 'flex'
                  }}
                >
                  <Col
                    xs={3}
                    style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}
                  >
                    {labels?.vehicle[key]?._title ?? key.toString()}{' '}
                    {rubric?.required ? <span className="text-danger">*</span> : null}
                  </Col>
                  <Col style={{ alignContent: 'center' }}>
                    {(() => {
                      switch (rubric.type) {
                        case 'free':
                          return (
                            <StyledFormControl
                              disabled={false}
                              type="text"
                              value={value}
                              onChange={(event) => setFieldValue(key, event?.target?.value)}
                              isValid={showFeedback && !error}
                              isInvalid={showFeedback && error}
                            />
                          )
                        case 'singleSelect':
                          return (
                            <Select
                              isClearable={true}
                              isMulti={false}
                              value={options.find((option) => option?.value === value) ?? null}
                              options={rubric.options(values) ?? []}
                              onChange={(option) => setFieldValue(key, option?.value ?? null)}
                              isRtl={true}
                              placeholder="בחר..."
                              styles={selectStyles}
                              isDisabled={disabled}
                            />
                          )
                        case 'multiSelect':
                          return (
                            <Select
                              isClearable={true}
                              isMulti={true}
                              value={options.filter((option) => value?.includes(option?.value))}
                              options={rubric.options(values) ?? []}
                              onChange={(selectedOptions) =>
                                setFieldValue(
                                  key,
                                  selectedOptions.length > 0
                                    ? selectedOptions.map((option) => option?.value)
                                    : null
                                )
                              }
                              isRtl={true}
                              placeholder="בחר..."
                              styles={selectStyles}
                              isDisabled={disabled}
                            />
                          )
                        default:
                          throw new Error()
                      }
                    })()}
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ display: showFeedback && error ? 'block' : 'none' }}
                    >
                      <small>{error}</small>
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              )
            })}
          </Form>
        )
      }}
    </Formik>
  )
})

VehicleForm.displayName = 'VehicleForm'

export default VehicleForm
