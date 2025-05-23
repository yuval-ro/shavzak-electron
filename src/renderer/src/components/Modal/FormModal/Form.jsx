// Form.jsx
import { useContext, useImperativeHandle } from 'react'
import { Form as BSForm, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { Formik } from 'formik'
import chroma from 'chroma-js'

import Context from './Context'
import './styles.scss'
import { INPUT_TYPES, BS_DANGER, BS_SUCCESS } from './CONSTS'
import Styled from './styled'

export default function Form({ fieldArray }) {
  const { formikRef, onSubmit } = useContext(Context)
  return (
    <Formik
      initialValues={fieldArray.getInitValues()}
      validationSchema={fieldArray.getValidSchema()}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, errors, setFieldValue, submitCount, submitForm }) => {
        useImperativeHandle(formikRef, () => ({
          triggerSubmit: () => submitForm()
        }))
        return (
          <BSForm noValidate onSubmit={handleSubmit}>
            {fieldArray
              .getFields()
              .map(({ name, label, initValue, required, inputType, options }, idx) => {
                const value = values[name] ?? initValue
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
                      borderBottom: '1px solid lightgray',
                      paddingTop: '5px',
                      paddingBottom: '5px'
                    }}
                  >
                    <Col
                      xs={3}
                      style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center'
                      }}
                    >
                      {label}
                      {required ? <span className="text-danger">*</span> : null}
                    </Col>
                    <Col style={{ alignContent: 'center' }}>
                      {(() => {
                        switch (inputType) {
                          case INPUT_TYPES.free:
                            return (
                              <Styled.FormControl
                                type="text"
                                value={value}
                                onChange={(event) => setFieldValue(name, event?.target?.value)}
                                isValid={showFeedback && !error}
                                isInvalid={showFeedback && error}
                                disabled={false}
                              />
                            )
                          case INPUT_TYPES.singleSelect:
                            return (
                              <Select
                                isSearchable={false}
                                isClearable={true}
                                isMulti={false}
                                value={options.find((option) => {
                                  if (option?.value?.getTime && value?.getTime) {
                                    return option.value.getTime() === value.getTime()
                                  } else if (option?.value) {
                                    return option?.value === value
                                  } else {
                                    return ''
                                  }
                                })}
                                options={options}
                                onChange={(option) => setFieldValue(name, option?.value ?? '')}
                                isRtl={true}
                                placeholder="בחר..."
                                styles={selectStyles}
                                isDisabled={false}
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
                                isDisabled={false}
                              />
                            )
                          default:
                            throw new Error(name)
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
              })}
          </BSForm>
        )
      }}
    </Formik>
  )
}
