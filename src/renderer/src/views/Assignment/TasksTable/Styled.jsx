import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'

const TableRow = styled(Row)`
  min-height: 2.5rem;
  border: 1px solid lightgray;
  background-color: #fff;
  padding: 0;
  margin-bottom: 0.1rem;
`
const TableCell = styled(Col)`
  padding-right: 0.75;
  padding-left: 0.75;
  height: 100%;
`

export const Header = Object.freeze({
  Row: styled(TableRow).attrs({
    className: 'bg-primary bg-opacity-50'
  })`
    align-items: center;
  `,
  Cell: styled(TableCell)``
})

export const Data = Object.freeze({
  Row: styled(TableRow)`
    min-height: 3rem;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #f0f0f0;
    }
  `,
  Cell: styled(TableCell)`
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  `
})
