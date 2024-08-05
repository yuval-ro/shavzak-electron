import { Dropdown } from 'react-bootstrap'

export default function Header({ children }) {
  return (
    <>
      <Dropdown.Item>{children}</Dropdown.Item>
      <Dropdown.Divider />
    </>
  )
}
