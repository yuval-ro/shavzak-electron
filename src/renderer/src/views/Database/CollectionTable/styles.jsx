/**
 * @file /src/components/CollectionTable/Styled.jsx
 */
import { Row, Col } from 'react-bootstrap'
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
export const Data = {
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
export const Header = {
  Row: styled(TableRow)`
    padding-right: 0;
    margin: 0rem;
  `,
  Cell: styled(TableCell)`
    overflow: visible;
  `
}
export const TableWrapper = styled(Row)`
  border: 1px solid lightgray;
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

// export const ToggleStatusCell = styled(TableCell)`
//   transition: background-color 0.3s ease;
//   background-color: ${({ $success }) => ($success ? '#d4edda' : '#f8d7da')};
//   color: ${({ $success }) => ($success ? '#155724' : '#721c24')};
// `
