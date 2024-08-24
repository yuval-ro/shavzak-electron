/**
 * @file /src/components/Toolbar.jsx
 */
import { ButtonGroup, ToggleButton, Form, Button, InputGroup } from 'react-bootstrap'
import { Search } from "react-bootstrap-icons"
import { WindowStack } from 'react-bootstrap-icons'

export default function Toolbar({
  tabs,
  activeTab,
  onTabChange,
  onSearchChange,
  onAddButtonClick
}) {
  return (
    <div className="hstack gap-2">
      <ButtonGroup>
        <InputGroup.Text>
          <WindowStack size="1.5em" />
        </InputGroup.Text>
        {Object.entries(tabs).map(([name, { title }], idx) => (
          <ToggleButton
            key={idx}
            variant={activeTab === name ? 'primary' : 'outline-primary'}
            onClick={() => onTabChange(name)}
            style={{
              width: '8rem',
              alignContent: 'center',
              justifyContent: 'center'
            }}
          >
            {title}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <InputGroup>
        <InputGroup.Text>
          <Search />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="חיפוש..."
          onChange={(event) => onSearchChange(event?.target?.value)}
        />
      </InputGroup>
      <Button
        variant="outline-primary"
        onClick={onAddButtonClick}
        style={{ minWidth: '6rem' }}
        className="ms-auto"
      >
        הוסף
      </Button>
    </div>
  )
}
