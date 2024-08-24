// Link.jsx
import * as Styled from './Styled'

export default function Link({ active, children }) {
  return <Styled.Link $active={active}>{children}</Styled.Link>
}
