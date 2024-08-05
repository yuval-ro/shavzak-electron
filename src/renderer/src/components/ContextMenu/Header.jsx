import { Dropdown } from 'react-bootstrap'

export default function Header({ children }) {
  return (
    <>
      <Dropdown.Item disabled className="text-body">{children}</Dropdown.Item>
      <Dropdown.Divider />
    </>
  )
}
