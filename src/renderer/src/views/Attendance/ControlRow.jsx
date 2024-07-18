import { Form } from 'react-bootstrap'

export default function ControlRow({ onSearchChange, style = {} }) {
  return (
    <div style={{ ...style, display: 'flex' }}>
      <Form.Control
        type="text"
        placeholder="חיפוש"
        style={{ marginLeft: '10px' }}
        onChange={(event) => onSearchChange(event?.target?.value)}
      />
    </div>
  )
}
