import PropBuilder from './PropBuilder'
import { REGEX } from './CONSTS'
const prop = new PropBuilder()

// const FieldTaskTeam = Object.freeze({
//   label: 'צוות',
//   props: {
//     callsign: {
//       type: String,
//       label: 'או"ק',
//       required: true,
//       matches: [/^[\u0590-\u05FF0-9\s]+$/, 'רצף אותיות בעברית ו/או ספרות']
//     },
//     leader: {
//       type: String, // existing Person ID or just a name
//       label: 'מפקד צוות',
//       required: true,
//       matches: [/^[\u0590-\u05FF\s]*$/, 'רצף אותיות בעברית עם אופציה לרווחים']
//     },
//     vehicle: {
//       type: String, // existing Vehicle ID or just a name
//       label: 'רכב',
//       required: false,
//       matches: [/^[\u0590-\u05FF0-9\s]+$/, 'רצף אותיות בעברית ו/או ספרות']
//     },
//     driver: {
//       type: String, // existing Person ID or just a name
//       label: 'נהג',
//       required: false,
//       matches: [/^[\u0590-\u05FF0-9\s]+$/, 'רצף אותיות בעברית ו/או ספרות'],
//       filter: (person, vehicleType) => person?.licenses?.includes(vehicleType)
//     },
//     members: {
//       type: Array[String], // existing Person ID or just a name
//       label: 'לוחמים',
//       required: false
//     }
//   }
// })

export const FieldTask = {
  stringify: (task) => task?.name,
  label: 'משימת שטח',
  props: {
    name: prop
      .pk()
      .label('שם משימה')
      .matches(...REGEX.task.name)
      .build(),
    leaderProfession: prop
      .optional()
      .label('הסמכת מפקד')
      .options({ fieldOfficer: 'קצין שטח', dutyOfficer: 'מפקד תורן' })
      .multi()
      .build()
  }
}

export default Object.freeze(FieldTask)
