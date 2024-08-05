const Vehicle = Object.freeze({
  stringify: (vehicle) => `${Vehicle.properties.type.oneOf[vehicle?.type]} ${vehicle?.plate}}`,
  label: 'רכב',
  primaryKey: 'plateNumber',
  properties: {
    plate: {
      label: 'לוחית זיהוי',
      required: true,
      matches: [
        /^(?=[\u05E6\u05DE]?)\u05E6?\u05DE?\d{5,8}$/,
        'רצף ספרות באורך 5-8 עם אפשרות לתחילית "מ" או "צ" '
      ]
    },
    type: {
      label: 'סוג רכב',
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
      label: 'כינוי',
      required: false,
      matches: [/^[\u0590-\u05FF0-9\s]+$/, 'רצף אותיות בעברית עם אופציה לספרות']
    }
  }
})
export default Vehicle
