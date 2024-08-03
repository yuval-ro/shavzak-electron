/**
 * @file /src/components/form-modal/Form.jsx
 */
import { forwardRef, useImperativeHandle } from 'react'
import { Form as BSForm, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { Formik } from 'formik'
import * as Yup from 'yup'
import chroma from 'chroma-js'
import styled from 'styled-components'

const StyledFormControl = styled(BSForm.Control)`
  &:focus {
    border-color: lightgray;
    box-shadow: 0 0 0 0.25rem rgba(211, 211, 211, 0.2);
  }
`
export const INPUT_TYPES = Object.freeze(
  Object.fromEntries(['free', 'multiSelect', 'singleSelect'].map((type, idx) => [type, idx]))
)

const Form = forwardRef(function renderForm({ rubrics, onSubmit }, ref) {
  const BS_DANGER = '#DC3545'
  const BS_SUCCESS = '#198754'
  return (
    <Formik
      initialValues={Object.fromEntries(
        Object.entries(rubrics).map(([key, { initValue }]) => [key, initValue])
      )}
      validationSchema={Yup.object().shape(
        Object.fromEntries(
          Object.entries(rubrics).map(([key, { validation }]) => [key, validation])
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
          <BSForm noValidate onSubmit={handleSubmit}>
            <div className="small my-1">
              <span>שדות המסומנים בכוכבית (</span>
              <span className="text-danger">*</span>
              <span>) הינם שדות חובה.</span>
            </div>
            {Object.entries(rubrics).map(
              ([name, { required, inputType, options, getHidden, getDisabled, label }], idx) => {
                const hidden = getHidden ? getHidden(values) : false
                const disabled = getDisabled && getDisabled(values)
                const value = values[name] ?? initialValues[name]
                const error = errors[name]
                const showFeedback = submitCount > 0 && required
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
                    key={idx}
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
                      {label}
                      {required ? <span className="text-danger">*</span> : null}
                    </Col>
                    <Col style={{ alignContent: 'center' }}>
                      {(() => {
                        switch (inputType) {
                          case INPUT_TYPES.free:
                            return (
                              <StyledFormControl
                                type="text"
                                value={value}
                                onChange={(event) => setFieldValue(name, event?.target?.value)}
                                isValid={showFeedback && !error}
                                isInvalid={showFeedback && error}
                                disabled={disabled}
                              />
                            )
                          case INPUT_TYPES.singleSelect:
                            return (
                              <Select
                                isSearchable={false}
                                isClearable={true}
                                isMulti={false}
                                value={options.find((option) => option?.value === value) ?? ''}
                                options={options}
                                onChange={(option) => setFieldValue(name, option?.value ?? '')}
                                isRtl={true}
                                placeholder="בחר..."
                                styles={selectStyles}
                                isDisabled={disabled}
                              />
                            )
                          case INPUT_TYPES.multiSelect:
                            return (
                              <Select
                                isSearchable={false}
                                isClearable={true}
                                isMulti={true}
                                value={
                                  value?.length > 0
                                    ? options.filter((option) => value.includes(option?.value))
                                    : ''
                                }
                                options={options}
                                onChange={(selectedOptions) =>
                                  setFieldValue(
                                    name,
                                    selectedOptions.map((option) => option?.value)
                                  )
                                }
                                isRtl={true}
                                placeholder="בחר..."
                                styles={selectStyles}
                                isDisabled={disabled}
                              />
                            )
                          default:
                            console.error({ name })
                            throw new Error()
                        }
                      })()}
                      <BSForm.Control.Feedback
                        type="invalid"
                        style={{ display: showFeedback && error ? 'block' : 'none' }}
                      >
                        <small>{error}</small>
                      </BSForm.Control.Feedback>
                    </Col>
                  </Row>
                )
              }
            )}
          </BSForm>
        )
      }}
    </Formik>
  )
})
export default Form
