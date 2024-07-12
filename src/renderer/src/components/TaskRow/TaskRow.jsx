import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import TaskSelect from './TaskSelect'

export default function TaskRow({
  options,
  shifts,
  taskName,
  taskLabel,
  length,
  onChange,
  isSelectDisabled,
  isOptionDisabled,
  perCell
}) {
  const style = {
    Col: styled(Col)`
      display: flex;
      justify-content: center;
      align-items: center;
    `
  }

  return (
    <Row>
      <style.Col xs={1}>{taskLabel}</style.Col>
      {Array(length)
        .fill()
        .map((_, i) => (
          <style.Col key={i.toString()}>
            {(() => {
              if (perCell > 1) {
                return Array(perCell)
                  .fill()
                  .map((_, j) => (
                    <TaskSelect
                      shifts={shifts}
                      options={options}
                      key={j}
                      idx={i}
                      value={
                        shifts[i] && shifts[i][`${taskName}${j + 1}`]
                          ? shifts[i][`${taskName}${j + 1}`]
                          : null
                      }
                      onChange={(event) => {
                        onChange({
                          idx: i,
                          task: `${taskName}${j + 1}`,
                          service_number: event?.target?.value
                        })
                      }}
                      isSelectDisabled={isSelectDisabled}
                      isOptionDisabled={isOptionDisabled}
                    />
                  ))
              } else {
                return (
                  <TaskSelect
                    shifts={shifts}
                    options={options}
                    idx={i}
                    value={shifts[i] && shifts[i][taskName] ? shifts[i][taskName] : null}
                    onChange={(event) => {
                      onChange({ idx: i, task: taskName, service_number: event?.target?.value })
                    }}
                    isSelectDisabled={isSelectDisabled}
                    isOptionDisabled={isOptionDisabled}
                  />
                )
              }
            })()}
          </style.Col>
        ))}
    </Row>
  )
}
