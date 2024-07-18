import { Navbar, Nav } from 'react-bootstrap'

export default function TopNavbar({ views, activeKey, onKeySelect }) {
  return (
    <Navbar style={{ backgroundColor: 'lightgray' }}>
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
        {views.map(({ title }, idx) => (
          <Nav.Item key={idx}>
            <Nav.Link eventKey={idx}>{title}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Navbar>
  )
}
