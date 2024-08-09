import PropBuilder from './PropBuilder'
import { REGEX } from './CONSTS'

const prop = new PropBuilder()

const Vehicle = {
  stringify: (vehicle) =>
    vehicle?.nickname ?? Vehicle?.props?.type?.options[vehicle?.type] + ' ' + vehicle?.plate,
  label: 'רכב',
  props: {
    plate: prop
      .pk()
      .label('לוחית זיהוי')
      .matches(...REGEX.vehicle.plate)
      .build(),
    type: prop
      .label('סוג')
      .options({
        davidManual: 'דוד ידני',
        davidAutomatic: 'דוד אוטומטי',
        savannahArmored: 'סוואנה בט"ש',
        savannahUnarmored: 'סוואנה לבנה',
        hiluxArmored: 'היילקס בט"ש',
        hiluxUnarmored: 'היילקס לבן',
        tritonArmored: 'טריטון בט"ש',
        tritonUnarmored: 'טריטון לבן',
        tigris: 'טיגריס',
        zeev: 'זאב',
        truck: 'משאית',
        panther: 'פנתר',
        ford: 'פורד'
      })
      .build(),
    nickname: prop
      .optional()
      .label('כינוי')
      .matches(...REGEX.vehicle.nickname)
      .build()
  }
}

export default Object.freeze(Vehicle)
