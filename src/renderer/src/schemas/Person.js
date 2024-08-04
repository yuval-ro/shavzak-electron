const Person = Object.freeze({
  label: 'שוטר',
  primaryKey: 'serviceNumber',
  properties: {
    affiliation: {
      label: 'שיוך',
      required: true,
      oneOf: { p2: 'מחלקה 2', p1: 'מחלקה 1', hq: 'מטה' }
    },
    serviceNumber: {
      label: 'מספר אישי',
      required: true,
      matches: [/^\d{7,8}$/, 'רצף ספרות באורך 7 או 8']
    },
    firstName: {
      label: 'שם פרטי',
      required: true,
      matches: [/^[\u0590-\u05FF\s]*$/, 'רצף אותיות בעברית עם אופציה לרווחים']
    },
    lastName: {
      label: 'שם משפחה',
      required: true,
      matches: [/^[\u0590-\u05FF\s]*$/, 'רצף אותיות בעברית עם אופציה לרווחים']
    },
    sex: {
      label: 'מין',
      required: true,
      oneOf: { m: 'זכר', f: 'נקבה' }
    },
    serviceType: {
      label: 'סוג שירות',
      required: true,
      oneOf: { enlisted: 'סדיר', nco: 'נגד', officer: 'קצין' }
    },
    rank: {
      label: 'דרגה',
      required: true,
      oneOf: {
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
      }
    },
    activeRole: {
      label: 'תפקיד',
      required: true,
      oneOf: {
        trooper: 'לוחם',
        os: 'סמב"ץ',
        sergeant: 'מ"כ',
        pxo: 'סמ"ח',
        pco: 'מ"מ',
        coo: 'קמב"ץ',
        cxo: 'סמ"פ',
        cco: 'מ"פ'
      }
    },
    professions: {
      label: 'הסמכות',
      required: false,
      anyOf: {
        commander: 'מפקד',
        medic: 'חובש',
        marksman: 'קלע',
        driver: 'נהג',
        fieldOfficer: 'קצין שטח',
        dutyOfficer: 'מפקד תורן',
        campOfficer: 'מפקד אבטחת מחנה'
      }
    },
    licenses: {
      label: 'היתרים',
      required: false,
      anyOf: {
        davidManual: 'דוד ידני',
        davidAutomatic: 'דוד אוטומט',
        private: 'רכב לבן',
        tigris: 'טיגריס',
        zeev: 'זאב',
        truck: 'משאית',
        panter: 'פנתר',
        savannahArmored: 'סוואנה בטש',
        savannahUnarmored: 'סוואנה לבנה',
        riotTruck: 'מכתזית'
      }
    }
  }
})

export default Person
