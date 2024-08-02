import { ToggleButton, Form, Button, InputGroup } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { MdOutlineViewCarousel } from 'react-icons/md'

export default function Toolbar({
  tabs,
  activeTab,
  onTabChange,
  onSearchChange,
  onAddButtonClick
}) {
  return (
    <div style={{ display: 'flex' }}>
      {onTabChange && (
        <InputGroup style={{ width: '20rem' }}>
          <InputGroup.Text>
            <MdOutlineViewCarousel size="1.5em" />
          </InputGroup.Text>
          {Object.entries(tabs).map(([name, { title }], idx) => (
            <ToggleButton
              key={idx}
              variant={activeTab === name ? 'primary' : 'outline-primary'}
              onClick={() => onTabChange(name)}
              style={{ flex: '1' }}
            >
              {title}
            </ToggleButton>
          ))}
        </InputGroup>
      )}
      {onSearchChange && (
        <InputGroup>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="חיפוש..."
            onChange={(event) => onSearchChange(event?.target?.value)}
            style={{ flex: 1, marginLeft: onAddButtonClick ? '1rem' : '' }}
          />
        </InputGroup>
      )}
      {onAddButtonClick && (
        <Button
          variant="outline-primary"
          onClick={onAddButtonClick}
          style={{ minWidth: '6rem' }}
          className="ms-auto"
        >
          הוסף
        </Button>
      )}
    </div>
  )
}
