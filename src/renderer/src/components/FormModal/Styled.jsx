/**
 * @file /src/components/FormModal/Styled.jsx
 */
import { default as BSFormControl } from 'react-bootstrap/FormControl'
import styled from 'styled-components'

export const FormControl = styled(BSFormControl)`
  &:focus {
    border-color: lightgray;
    box-shadow: 0 0 0 0.25rem rgba(211, 211, 211, 0.2);
  }
`
