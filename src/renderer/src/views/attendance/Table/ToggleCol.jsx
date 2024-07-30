import { Col } from 'react-bootstrap'
import styled from 'styled-components'

const Style = styled(Col)`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding-right: 15px;
  background-color: ${(props) => (props.state === 'true' ? '#d4edda' : '#f8d7da')};
  color: ${(props) => (props.state === 'true' ? '#155724' : '#721c24')};

  &:hover {
    background-color: ${(props) => (props.state === 'true' ? '#c3e6cb' : '#f5c6cb')};
  }
`

export default function ToggleCol({ state, onClick }) {
  return (
    <Style
      state={state.toString()} // Pass state prop to Style
      onClick={onClick}
    >
      {state ? 'נוכח' : 'נעדר'}
    </Style>
  )
}
