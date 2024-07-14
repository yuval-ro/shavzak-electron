import { Row, Col } from 'react-bootstrap'
import { FiSunrise, FiSunset } from 'react-icons/fi'
import { RiMoonClearLine } from 'react-icons/ri'

import { formatShift } from '../../helpers'

export default function HeaderRow({ shifts, startIdx, length }) {
  function getIcon(type) {
    switch (type) {
      case 'morning':
        return <FiSunrise />
      case 'evening':
        return <FiSunset />
      default:
        return <RiMoonClearLine />
    }
  }
  return (
    <Row>
      <Col xs={1}></Col>
      {shifts.length < 1
        ? null
        : shifts.slice(startIdx, startIdx + length).map((shift, idx) => (
            <Col key={idx} style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {getIcon(shift._type)}
                <span style={{ marginLeft: '5px', textTransform: 'capitalize' }}>
                  {shift._type}
                </span>
              </div>
              <span style={{ marginLeft: '20px' }}>{formatShift(shift._span)}</span>
            </Col>
          ))}
    </Row>
  )
}
