// styled.jsx
import { Row, Col, InputGroup as BSInputGroup } from 'react-bootstrap'
import styled from 'styled-components'
import chroma from 'chroma-js'

const TableRow = styled(Row)`
  user-select: none;
  height: 2.5rem;
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
`
const TableCell = styled(Col)`
  height: 100%;
  align-content: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  white-space: nowrap;
  overflow-x: hidden;
`
const Data = {
  Row: styled(TableRow)`
    border-top: 1px solid lightgray;
    align-items: center;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: ${chroma('white').darken(0.2)} !important;
    }
  `,
  Cell: TableCell
}
const Header = {
  Row: styled(TableRow)`
    padding-right: 0;
    margin: 0rem;
  `,
  Cell: styled(TableCell)`
    overflow: visible;
  `
}
const TableWrapper = styled(Row)`
  border: 1px solid lightgray;
`
const Scrollable = styled.div`
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 73vh;
`
const ColName = styled.span`
  position: relative;
  user-select: none;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  color: ${(props) => (props.$disabled ? 'gray' : 'black')};
  &:hover {
    cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
    text-decoration: underline;
  }
`
const SelectWrapper = styled.div`
  flex-grow: 1;
`

const InputGroup = styled(BSInputGroup)`
  max-width: ${(props) => props?.$width ?? '20%'};
`

export default {
  Data,
  Header,
  TableWrapper,
  Scrollable,
  ColName,
  SelectWrapper,
  InputGroup
}
