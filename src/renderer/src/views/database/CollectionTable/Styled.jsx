/**
 * @file /src/components/DBTable/Styled.jsx
 */
import { Row as BSRow, Col as BSCol } from 'react-bootstrap'
import styled from 'styled-components'

export const Row = styled(BSRow)`
  user-select: none;
  height: 2.5rem;
  align-items: center;
  padding: 8px;
`
export const DataCell = styled(BSCol)`
  max-width: 7rem;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
`
export const HeaderCell = styled(BSCol)`
  max-width: 7rem;
  text-overflow: clip;
  white-space: nowrap;
`
export const DataRow = styled(Row)`
  cursor: pointer;
  border-top: 1px solid lightgray;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0 !important;
  }
`
export const Scrollable = styled.div`
  height: 700px;
  overflow-y: scroll;
  overflow-x: hidden;
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
