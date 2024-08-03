import RubricsBuilder from '#src/components/form-modal/RubricsBuilder.js'
import Person from '#src/schemas/Person.js'
import labels from '#src/labels.json'
import eligible from '#src/eligible.json'

const options = Object.freeze({
  people: (property) =>
    Object.entries(labels?.person[property])
      .filter(([key, val]) => !key.startsWith('_'))
      .map(([key, val]) => ({ value: key, label: val })),
  vehicles: (property) =>
    Object.entries(labels?.vehicle[property])
      .filter(([key, val]) => !key.startsWith('_'))
      .map(([key, val]) => ({ value: key, label: val }))
})
const label = Object.freeze({
  people: (property) => labels?.person[property]?._title ?? property,
  vehicles: (property) => labels?.vehicle[property]?._title ?? property
})

export function buildPersonFormRubrics({ takenIds, initValues }) {
  const builder = new RubricsBuilder({ takenIds, initValues, labels: labels.person })
  builder.addSingleSelect({
    name: 'affiliation',
    label: label.people('affiliation'),
    required: 'יש לבחור שיוך כנדרש.'
  })
  builder.addFree({
    name: 'serviceNumber',
    label: label.people('serviceNumber'),
    required: 'יש למלא מספר אישי כנדרש.',
    matches: [/^\d{7,8}$/, 'מספר אישי צריך להיות רצף ספרות באורך 7 או 8.']
  })
  builder.addFree({
    name: 'firstName',
    label: label.people('firstName'),
    required: 'יש למלא שם פרטי כנדרש.',
    matches: [
      /^[\u0590-\u05FF\s]*$/,
      'שם פרטי צריך להיות רצף אותיות בעברית בלבד, עם אופציה לרווחים.'
    ]
  })
  builder.addFree({
    name: 'lastName',
    label: label.people('lastName'),
    required: 'יש למלא שם משפחה כנדרש.',
    matches: [
      /^[\u0590-\u05FF\s]*$/,
      'שם משפחה צריך להיות רצף אותיות בעברית בלבד, עם אופציה לרווחים.'
    ]
  })
  builder.addSingleSelect({
    name: 'sex',
    label: label.people('sex'),
    options: options.people('sex'),
    required: 'יש לבחור מין כנדרש.'
  })
  builder.addSingleSelect({
    name: 'serviceType',
    label: label.people('serviceType'),
    options: options.people('serviceType'),
    required: 'יש לבחור סוג השירות כנדרש.'
  })
  builder.addSingleSelect({
    name: 'rank',
    label: label.people('rank'),
    required: 'יש לבחור דרגה כנדרש.',
    filter: (values /* Formik values object */) => (option /* React Select option */) => {
      const { serviceType } = values
      const { value } = option
      switch (serviceType) {
        case 'enlisted':
          return value.startsWith('e') && value >= 'e1' && value <= 'e3'
        case 'nco':
          return value.startsWith('e') && value >= 'e3'
        case 'officer':
          return value.startsWith('o')
      }
    }
  })
  builder.addSingleSelect({
    name: 'activeRole',
    required: 'יש לבחור את התפקיד כנדרש.',
    label: label.people('activeRole'),
    filter: (values /* Formik values object */) => (option /* React Select option*/) => {
      return true // FIXME  eligible.activeRole[rank].includes(key)
    }
  })
  builder.addMultiSelect({
    name: 'professions',
    options: [],
    filter: (values /* Formik values object */) => (option /* React Select option*/) => {
      return true // FIXME  eligible.professions[rank].includes(key)
    }
  })
  builder.addMultiSelect({
    name: 'licenses'
  })
  return builder.build()
}

export function buildVehicleFormRubrics({ takenIds = [], initValues = {} }) {
  const builder = new RubricsBuilder({ takenIds, initValues, labels: labels.vehicle })
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
