import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function ControlRow({ onAddClick }) {
  const [searchFilter, setSearchFilter] = useState('')
  return (
    <div style={{ display: 'flex', margin: '5px' }}>
      <Form.Control type="text" placeholder="חיפוש" style={{ marginLeft: '10px' }} />
      <Button
        variant="outline-primary"
        onClick={onAddClick}
        // style={{
        //   display: 'flex',
        //   flexDirection: 'row',
        //   alignItems: 'center',
        //   padding: '3px',
        //   width: '70px',
        //   justifyContent: 'space-between'
        // }}
      >
        הוסף
      </Button>
    </div>
  )
}
