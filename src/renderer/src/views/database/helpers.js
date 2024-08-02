import RubricsBuilder from '#src/components/form-modal/RubricsBuilder.js'
import labels from '#src/labels.json'
import eligible from '#src/eligible.json'

export function buildPersonFormRubrics({ takenIds = [], initValues = {} }) {
  const builder = new RubricsBuilder(initValues, takenIds, labels.person)
  builder.addSingleSelect({
    name: 'affiliation',
    required: 'יש לבחור שיוך כנדרש.'
  })
  builder.addFree({
    name: 'serviceNumber',
    required: 'יש למלא מספר אישי כנדרש.',
    matches: [/^\d{7,8}$/, 'מספר אישי צריך להיות רצף ספרות באורך 7 או 8.']
  })
  builder.addFree({
    name: 'firstName',
    required: 'יש למלא שם פרטי כנדרש.',
    matches: [
      /^[\u0590-\u05FF\s]*$/,
      'שם פרטי צריך להיות רצף אותיות בעברית בלבד, עם אופציה לרווחים.'
    ]
  })
  builder.addFree({
    name: 'lastName',
    required: 'יש למלא שם משפחה כנדרש.',
    matches: [
      /^[\u0590-\u05FF\s]*$/,
      'שם משפחה צריך להיות רצף אותיות בעברית בלבד, עם אופציה לרווחים.'
    ]
  })
  builder.addSingleSelect({
    name: 'sex',
    required: 'יש לבחור מין כנדרש.'
  })
  builder.addSingleSelect({
    name: 'serviceType',
    required: 'יש לבחור סוג השירות כנדרש.'
  })
  builder.addSingleSelect({
    name: 'rank',
    required: 'יש לבחור דרגה כנדרש.'
    // FIXME
    // optionFilter: ([key, val]) => {
    //   switch (serviceType) {
    //     case 'enlisted':
    //       return key.startsWith('e') && key >= 'e1' && key <= 'e3'
    //     case 'nco':
    //       return key.startsWith('e') && key >= 'e3'
    //     case 'officer':
    //       return key.startsWith('o')
    //   }
    // }
  })
  builder.addSingleSelect({
    name: 'activeRole',
    required: 'יש לבחור את התפקיד כנדרש.'
    // FIXME
    // optionFilter: ([key, val]) => eligible.activeRole[rank].includes(key)
  })
  builder.addMultiSelect({
    name: 'professions'
    // FIXME
    // optionFilter: ([key, val]) => eligible.professions[rank].includes(key)
  })
  builder.addMultiSelect({
    name: 'licenses'
  })
  return builder.build()
}

export function buildVehicleFormRubrics({ takenIds = [], initValues = {} }) {
  const builder = new RubricsBuilder(initValues, takenIds, labels.vehicle)
  builder.addFree({
    name: 'plate',
    required: 'יש למלא לוחית זיהוי כנדרש.',
    matches: [
      /^(?=[\u05E6\u05DE]?)\u05E6?\u05DE?\d{5,8}$/,
      'לוחית זיהוי צריכה להיות רצף ספרות באורך 5-8, עם אפשרות לתחילית "מ" או "צ".'
    ]
  })
  builder.addSingleSelect({
    name: 'type',
    required: 'יש לבחור סוג רכב כנדרש.'
  })
  builder.addFree({
    name: 'nickname',
    matches: [/^[\u0590-\u05FF0-9\s]+$/, 'כינוי צריך להיות רצף אותיות בעברית ו/או ספרות.']
  })
  return builder.build()
}
