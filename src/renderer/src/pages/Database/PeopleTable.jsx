import { Row, Col, Container, ListGroup } from 'react-bootstrap'
import labels from '../../hebrew_labels.json'

export default function PeopleTable({ people }) {
  const COLS = [
    { key: 'service_number', translate: false },
    { key: 'first_name', translate: false },
    { key: 'last_name', translate: false },
    { key: 'sex', translate: true },
    { key: 'service_type', translate: true },
    { key: 'rank', translate: true },
    { key: 'role', translate: true },
    { key: 'professions', translate: true },
    { key: 'affiliation', translate: true }
  ]

  function renderCellValue({ key, translate }, person) {
    const value = person[key]
    if (translate) {
      if (Array.isArray(value)) {
        const translated_values = value.map((sub_value) => labels.person[key][sub_value])
        return translated_values.join(', ')
      } else {
        const translated_value = labels.person[key][value]
        return Array.isArray(translated_value)
          ? translated_value[1] ?? translated_value[0]
          : translated_value
      }
    } else {
      return value
    }
  }

  const sortFn = (a, b) => {
    if (a.affiliation < b.affiliation) return -1
    if (a.affiliation > b.affiliation) return 1
    if (a.service_type === 'officer' && (b.service_type === 'enlisted' || b.service_type === 'nco'))
      return -1
    if (b.service_type === 'officer' && (a.service_type === 'enlisted' || a.service_type === 'nco'))
      return 1
    if (a.service_type === 'nco' && b.service_type === 'enlisted') return -1
    if (b.service_type === 'nco' && a.service_type === 'enlisted') return 1
    if (a.rank < b.rank) return 1
    if (a.rank > b.rank) return -1
    return a.first_name.localeCompare(b.first_name)
  }

  return (
    <Container fluid style={{ direction: 'rtl' }}>
      <ListGroup>
        <ListGroup.Item>
          <Row>
            <Col>מס"ד</Col>
            {COLS.map((col, idx) => {
              try {
                return <Col key={idx}>{labels.person[col.key]._title}</Col>
              } catch (err) {
                console.error({ col })
                throw err
              }
            })}
          </Row>
        </ListGroup.Item>
        {people.sort(sortFn).map((person, idx) => (
          <ListGroup.Item key={idx} action>
            <Row>
              <Col>{idx + 1}</Col>
              {COLS.map((col, idx) => (
                <Col key={idx}>{renderCellValue(col, person)}</Col>
              ))}
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}
