/**
 * @file /src/views/database/PersonForm.jsx
 */
import { useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { Formik } from 'formik'
import * as yup from 'yup'
import chroma from 'chroma-js'
import styled from 'styled-components'

import labels from '#src/labels.json'
import eligible from '#src/eligible.json'

const HEBREW_REGEX = /^[\u0590-\u05FF-]*$/
const SERVICE_NUMBER_REGEX = /^\d{7,8}$/
const BS_DANGER = '#DC3545'
const BS_SUCCESS = '#198754'

const StyledFormControl = styled(Form.Control)`
  &:focus {
    border-color: lightgray;
    box-shadow: 0 0 0 0.25rem rgba(211, 211, 211, 0.2);
  }
`

const PersonForm = forwardRef(({ takenIds = [], initValues = {}, onSubmit }, ref) => {
  const isMounted = useRef(false)

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
            setFieldValue('rank', null)
            setFieldValue('activeRole', null)
          }
        }, [values.serviceType, setFieldValue])
        useEffect(() => {
          if (isMounted.current) {
            setFieldValue('activeRole', null)
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
                  backgroundColor: isFocused
                    ? '#f2f2f2'
                    : isSelected
                      ? '#ffffff'
                      : styles.backgroundColor,
                  fontWeight: isSelected ? 'bold' : styles.fontWeight,
                  color: '#1f1f1f'
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
                              value={value}
                              onChange={(event) => setFieldValue(key, event?.target?.value)}
                              isValid={showFeedback && !error}
                              isInvalid={showFeedback && error}
                            />
                          )
                        case 'singleSelect':
                          return (
                            <Select
                              isSearchable={false}
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
                              isSearchable={false}
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
                          return null
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

PersonForm.displayName = 'PersonForm'

export default PersonForm
