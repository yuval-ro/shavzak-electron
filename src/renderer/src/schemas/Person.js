import PropBuilder from './PropBuilder.js'
import { REGEX } from './CONSTS.js'

const prop = new PropBuilder()

const Person = {
  stringify: (person) =>
    Person?.props?.rank?.options[person?.rank] + ' ' + person?.firstName + ' ' + person?.lastName,
  label: 'שוטר',
  props: {
    affiliation: prop.label('שם').options({ hq: 'מטה', p1: 'מחלקה 1', p2: 'מחלקה 2' }).build(),
    serviceNumber: prop
      .pk()
      .label('מספר אישי')
      .matches(...REGEX.person.serviceNumber)
      .build(),
    firstName: prop
      .label('שם פרטי')
      .matches(...REGEX.person.name)
      .build(),
    lastName: prop
      .label('שם משפחה')
      .matches(...REGEX.person.name)
      .build(),
    sex: prop.label('מין').options({ m: 'זכר', f: 'נקבה' }).build(),
    serviceType: prop
      .label('סוג שירות')
      .options({ enlisted: 'סדיר', nco: 'נגד', officer: 'קצין' })
      .build(),
    rank: prop
      .label('דרגה')
      .options({
        e1: 'רש"ט',
        e2: 'סמ"ש',
        e3: 'סמ"ר',
        e4: 'רס"ל',
        e5: 'רס"ר',
        e6: 'רס"מ',
        e7: 'רס"ב',
        o1: 'ממ"ש',
        o2: 'מפקח',
        o3: 'פקד',
        o4: 'רפ"ק'
      })
      .build(),
    activeRole: prop
      .label('תפקיד')
      .options({
        trooper: 'לוחם',
        os: 'סמב"ץ',
        sergeant: 'מ"כ',
        pxo: 'סמ"ח',
        pco: 'מ"מ',
        coo: 'קמב"ץ',
        cxo: 'סמ"פ',
        cco: 'מ"פ'
      })
      .build(),
    professions: prop
      .optional()
      .label('הסמכות')
      .options({
        commander: 'מפקד',
        medic: 'חובש',
        marksman: 'קלע',
        driver: 'נהג',
        fieldOfficer: 'קצין שטח',
        dutyOfficer: 'מפקד תורן',
        campOfficer: 'מפקד אבטחת מחנה'
      })
      .multi()
      .build(),
    licenses: prop
      .optional()
      .label('היתרים')
      .options({
        davidManual: 'דוד ידני',
        davidAutomatic: 'דוד אוטומט',
        private: 'רכב לבן',
        tigris: 'טיגריס',
        zeev: 'זאב',
        truck: 'משאית',
        panter: 'פנתר',
        savannahArmored: 'סוואנה בט"ש',
        savannahUnarmored: 'סוואנה לבנה',
        riotTruck: 'מכתזית'
      })
      .multi()
      .build()
  }
}

export default Object.freeze(Person)
