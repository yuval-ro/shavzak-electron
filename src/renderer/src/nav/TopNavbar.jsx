import { Navbar, Nav } from 'react-bootstrap'

export default function TopNavbar({ links, activeKey, onKeySelect }) {
  return (
    <Navbar className="bg-light">
      <Navbar.Brand>פלוגה מד</Navbar.Brand>
      <Nav
        variant="underline"
        activeKey={activeKey}
        onSelect={onKeySelect}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          marginRight: '30px'
        }}
      >
        {links.map(({ value, label }, idx) => (
          <Nav.Item key={idx}>
            <Nav.Link eventKey={value}>{label}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Navbar>
  )
}
