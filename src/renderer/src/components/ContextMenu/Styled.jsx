import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'
import chroma from 'chroma-js'

export const Menu = styled(Dropdown.Menu)`
  padding: 0;
  border-radius: 0;
`

export const Item = styled(Dropdown.Item)`
  padding: 0.5rem;

  color: ${({ $danger }) => ($danger ? chroma('red').darken(1) : chroma('black'))} !important;
  &:hover {
    background-color: ${({ $danger }) => ($danger ? '#f8d7da' : chroma('white').darken(0.1))};
  }
`
