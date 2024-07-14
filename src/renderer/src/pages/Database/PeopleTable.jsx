import { Row, Col, Container } from 'react-bootstrap'
import labels from '../../hebrew_labels.json'

export default function PeopleTable({ people }) {
  const headerRow = [
    'unit',
    'first_name_he',
    'last_name_he',
    'role',
    'position',
    'sex',
    'rank',
    'service_number',
    'id_number'
  ]
  const translatable = ['rank', 'sex', 'role', 'position', 'unit']

  function translate(key, value) {
    if (translatable.includes(key)) {
      if (Array.isArray(labels.props[key][value])) {
        return labels.props[key][value][1] ?? labels.props[key][value][0]
      } else {
        return labels.props[key][value]
      }
    } else {
      return value
    }
  }

  return (
    <Container fluid style={{ direction: 'rtl' }}>
      <Row>
        <Col>מסד</Col>
        {headerRow.map((col, idx) => (
          <Col key={idx}>{labels.props[col]._title}</Col>
        ))}
      </Row>
      {people?.map((person, idx) => (
        <Row key={idx}>
          <Col>{idx + 1}</Col>
          {headerRow.map((key, idx) => (
            <Col key={idx}>{translate(key, person[key])}</Col>
          ))}
        </Row>
      ))}
    </Container>
  )
}
