import { Form, Button, ButtonGroup, ToggleButton } from 'react-bootstrap'

export default function Toolbar({ activeTab, onTabChange, onSearchChange, onAddClick }) {
  return (
    <div style={{ display: 'flex' }}>
      <ButtonGroup style={{ marginLeft: '8px' }}>
        <ToggleButton
          variant={activeTab === 'people' ? 'primary' : 'outline-primary'}
          style={{ width: '100px', whiteSpace: 'nowrap' }}
          onClick={() => onTabChange('people')}
        >
          כוח אדם
        </ToggleButton>
        <ToggleButton
          variant={activeTab === 'vehicles' ? 'primary' : 'outline-primary'}
          style={{ width: '100px', whiteSpace: 'nowrap' }}
          onClick={() => onTabChange('vehicles')}
        >
          רכבים
        </ToggleButton>
      </ButtonGroup>
      <Form.Control
        type="text"
        placeholder="חיפוש"
        style={{ marginLeft: '10px' }}
        onChange={(event) => onSearchChange(event?.target?.value)}
      />
      <Button variant="outline-primary" onClick={onAddClick} style={{ minWidth: '100px' }}>
        הוסף
      </Button>
    </div>
  )
}
