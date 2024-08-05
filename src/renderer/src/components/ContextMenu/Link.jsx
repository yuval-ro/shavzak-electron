import styled from 'styled-components'

const Link = styled.span`
  position: relative;
  user-select: none;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  color: ${(props) => (props.$disabled ? 'gray' : 'black')};

  &:hover {
    cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
    text-decoration: underline;
  }
`
export default Link
