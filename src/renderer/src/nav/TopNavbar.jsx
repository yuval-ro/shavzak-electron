import { Navbar, Nav } from 'react-bootstrap'

export default function TopNavbar({ links, activeKey, onKeySelect}) {
  return (
    <Navbar className="bg-primary bg-gradient" style={{ paddingRight: '2.2rem', userSelect: "none"}}>
      <Navbar.Brand className="text-white fw-bold">פלוגה מד</Navbar.Brand>
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
            <Nav.Link eventKey={value} className="text-white">
              {label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Navbar>
  )
}
