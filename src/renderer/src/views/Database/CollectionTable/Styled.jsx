/**
 * @file /src/components/CollectionTable/Styled.jsx
 */
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

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
  max-width: 7rem;
  text-overflow: clip;
  white-space: nowrap;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`
export const TableWrapper = styled(Row)`
  border: 1px solid lightgray;
`
export const HeaderRow = styled(TableRow)`
  padding-right: 0;
  margin: 0rem;
`
export const DataCell = styled(TableCell)`
  height: 100%;
  align-content: center;
`
export const HeaderCell = styled(TableCell)``
export const DataRow = styled(TableRow)`
  cursor: pointer;
  border-top: 1px solid lightgray;
  align-items: center;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0 !important;
  }
`
export const Scrollable = styled.div`
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 73vh;
`

export const ColName = styled.span`
  position: relative;
  user-select: none;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  color: ${(props) => (props.$disabled ? 'gray' : 'black')};

  &:hover {
    cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
    text-decoration: underline;
  }
`
