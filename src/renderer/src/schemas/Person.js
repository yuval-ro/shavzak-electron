const Person = Object.freeze({
  hebrew: 'שוטר',
  primaryKey: 'serviceNumber',
  properties: {
    serviceNumber: {
      hebrew: 'מספר אישי',
      required: true,
      matches: /^\d{7,8}$/
    },
    affiliation: {
      hebrew: 'שיוך',
      required: true,
      oneOf: { p1: 'זכר', p2: 'נקבה', hq: 'מטה' }
    },
    firstName: {
      hebrew: 'שם פרטי',
      required: true,
      matches: /^[\u0590-\u05FF\s]*$/
    },
    lastName: {
      hebrew: 'שם משפחה',
      required: true,
      matches: /^[\u0590-\u05FF\s]*$/
    },
    sex: {
      hebrew: 'מין',
      required: true,
      oneOf: { m: 'זכר', f: 'נקבה' }
    },
    serviceType: {
      hebrew: 'סוג שירות',
      required: true,
      oneOf: { enlisted: 'סדיר', nco: 'נגד', officer: 'קצין' }
    },
    rank: {
      hebrew: 'דרגה',
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
      hebrew: 'תפקיד',
      required: true,
      oneOf: {
        trooper: 'לוחם',
        os: 'סמב""ץ',
        sergeant: 'מ"כ',
        pxo: 'סמח',
        pco: 'מ"מ',
        cco: 'מ"פ',
        cxo: 'סמ"פ',
        coo: 'קמב"ץ'
      }
    },
    professions: {
      hebrew: 'הסמכות',
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
      hebrew: 'היתרים',
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