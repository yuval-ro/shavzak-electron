const Vehicle = Object.freeze({
  hebrew: 'רכב',
  primaryKey: 'plateNumber',
  properties: {
    plate: {
      hebrew: 'לוחית זיהוי',
      required: true,
      matches: /^(?=[\u05E6\u05DE]?)\u05E6?\u05DE?\d{5,8}$/
    },
    type: {
      hebrew: 'סוג רכב',
      required: true,
      oneOf: {
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
      }
    },
    nickname: {
      hebrew: 'כינוי',
      required: false,
      matches: /^[\u0590-\u05FF0-9\s]+$/
    }
  }
})
export default Vehicle
