// Toolbar.jsx
import { Row, Col, Button, InputGroup } from 'react-bootstrap'
import { Database } from 'react-bootstrap-icons'

import Select from 'react-select'

export default function Toolbar({ tabs, onTabChange, onAddButton }) {
  const options = Object.entries(tabs).map(([key, value]) => ({
    value: key,
    label: value?.label
  }))
  return (
    <Row className="pb-2 px-1">
      <Col xs={3}>
        <InputGroup>
          <InputGroup.Text>
            <Database />
          </InputGroup.Text>
          <div style={{ flexGrow: 1 }}>
            <Select
              isSearchable={false}
              options={options}
              defaultValue={options[0]}
              onChange={({ value }) => onTabChange(value)}
            />
          </div>
        </InputGroup>
      </Col>
      <Col className="d-flex justify-content-end">
        <Button variant="success" onClick={onAddButton} style={{ minWidth: '6rem' }}>
          הוסף
        </Button>
      </Col>
    </Row>
  )
}
