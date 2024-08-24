/**
 * @file /src/store/shift.js
 */
import moment from 'moment'

const SHIFT_TYPE = Object.freeze({
  6: 'בוקר',
  14: 'צהריים',
  22: 'לילה'
})

export function createShift(prevShift) {
  const start = prevShift ? moment(prevShift?.end) : moment().add(1, 'd').startOf('d').add(6, 'h')
  const end = moment(start).add(8, 'h')
  return {
    type: SHIFT_TYPE[start.hours()],
    start: start.toDate(), // IMPORTANT
    end: end.toDate(),
    unavailable: [],
    assigned: {}
  }
}

