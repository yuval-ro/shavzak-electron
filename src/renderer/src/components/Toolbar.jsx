import { ButtonGroup, ToggleButton, Form, Button } from 'react-bootstrap'

export default function Toolbar({
  tabs = [],
  activeTab = null,
  onTabChange = (tabName) => {},
  onSearchChange = (searchTerm) => {},
  onAddButtonClick = () => {}
}) {
  return (
    <div style={{ display: 'flex' }}>
      <ButtonGroup style={{ marginLeft: '8px' }}>
        {tabs.map(({ name, title }, idx) => (
          <ToggleButton
            key={idx}
            variant={activeTab === name ? 'primary' : 'outline-primary'}
            onClick={() => onTabChange(name)}
            style={{ minWidth: '8rem' }}
          >
            {title}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <Form.Control
        type="text"
        placeholder="חיפוש"
        style={{ marginLeft: '10px' }}
        onChange={(event) => onSearchChange(event?.target?.value)}
      />
      <Button variant="outline-primary" onClick={onAddButtonClick} style={{ minWidth: '100px' }}>
        הוסף
      </Button>
    </div>
  )
}
