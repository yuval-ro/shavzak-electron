import { Form, Button } from 'react-bootstrap'

export default function ControlRow({ onSearchChange, onAddClick, style = {} }) {
  return (
    <div style={{ ...style, display: 'flex' }}>
      <Form.Control
        type="text"
        placeholder="חיפוש"
        style={{ marginLeft: '10px' }}
        onChange={(event) => onSearchChange(event?.target?.value)}
      />
      <Button variant="outline-primary" onClick={onAddClick}>
        הוסף
      </Button>
    </div>
  )
}
