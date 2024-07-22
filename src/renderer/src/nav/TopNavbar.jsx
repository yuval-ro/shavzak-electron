import { Navbar, Nav } from 'react-bootstrap'

export default function TopNavbar({ titles, activeKey, onKeySelect }) {
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
        {titles.map((title, idx) => (
          <Nav.Item key={idx}>
            <Nav.Link eventKey={idx}>{title}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Navbar>
  )
}
