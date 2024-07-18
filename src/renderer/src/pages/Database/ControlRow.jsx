import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function ControlRow({ onAddClick, style = {} }) {
  const [searchFilter, setSearchFilter] = useState('') // TODO Implement this feature.
  return (
    <div style={{ ...style, display: 'flex' }}>
      <Form.Control type="text" placeholder="חיפוש" style={{ marginLeft: '10px' }} />
      <Button variant="outline-primary" onClick={onAddClick}>
        הוסף
      </Button>
    </div>
  )
}
