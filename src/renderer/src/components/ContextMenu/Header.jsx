import * as Styled from './Styled'

export default function Header({ children }) {
  return (
    <Styled.Item disabled className="text-body bg-body-secondary">
      {children}
    </Styled.Item>
  )
}
