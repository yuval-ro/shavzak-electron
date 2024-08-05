import { FieldArray } from '#src/components/FormModal'

export function schema2fieldArray(Schema, existingValues = {}, excludeProps = []) {
  const fieldArray = new FieldArray(existingValues)
  Object.entries(Schema.properties)
    .filter(([key]) => !excludeProps.includes(key))
    .forEach(([name, { label, required, matches, oneOf, anyOf }]) => {
      let args = { name, label, required }
      if (matches) {
        fieldArray.addFreeField({ ...args, matches })
      } else if (oneOf) {
        fieldArray.addSelectField({ ...args, options: oneOf, multi: false })
      } else if (anyOf) {
        fieldArray.addSelectField({ ...args, options: anyOf, multi: true })
      } else {
        throw new Error()
      }
    })
  return fieldArray
}

export function schema2cols(Schema, innerSort = {}, unsortable = {}) {
  return Object.entries(Schema.properties).map(([propName, { label }]) => ({
    name: propName,
    label,
    sortable: unsortable[propName] ?? true,
    innerSort: innerSort[propName] ?? null
  }))
}

export function collection2rows(Schema, collection) {
  const result = collection.map((doc) =>
    Object.fromEntries([
      ...Object.entries(doc).map(([key, value]) => {
        if (key.startsWith('_')) {
          return [key, value]
        }
        const prop = Schema.properties[key]
        return [
          key,
          Array.isArray(value)
            ? value.map((item) => ({ value: item, label: prop.anyOf[item] }))
            : prop?.oneOf
              ? { value, label: prop.oneOf[value] }
              : { value }
        ]
      }),
      ['label', Schema.stringify(doc)]
    ])
  )
  return result
}

// export function filterExistingIds(Schema, docs) {
//   return docs.
// }
//   builder.addSingleSelectField({
//     name: 'affiliation',
//     label: label.people('affiliation'),
//     required: 'יש לבחור שיוך כנדרש.'
//   })
//   builder.addFreeField({
//     name: 'serviceNumber',
//     label: label.people('serviceNumber'),
//     required: 'יש למלא מספר אישי כנדרש.',
//     matches: [/^\d{7,8}$/, 'מספר אישי צריך להיות רצף ספרות באורך 7 או 8.']
//   })
//   builder.addFreeField({
//     name: 'firstName',
//     label: label.people('firstName'),
//     required: 'יש למלא שם פרטי כנדרש.',
//     matches: [
//       /^[\u0590-\u05FF\s]*$/,
//       'שם פרטי צריך להיות רצף אותיות בעברית בלבד, עם אופציה לרווחים.'
//     ]
//   })
//   builder.addFreeField({
//     name: 'lastName',
//     label: label.people('lastName'),
//     required: 'יש למלא שם משפחה כנדרש.',
//     matches: [
//       /^[\u0590-\u05FF\s]*$/,
//       'שם משפחה צריך להיות רצף אותיות בעברית בלבד, עם אופציה לרווחים.'
//     ]
//   })
//   builder.addSingleSelectField({
//     name: 'sex',
//     label: label.people('sex'),
//     options: options.people('sex'),
//     required: 'יש לבחור מין כנדרש.'
//   })
//   builder.addSingleSelectField({
//     name: 'serviceType',
//     label: label.people('serviceType'),
//     options: options.people('serviceType'),
//     required: 'יש לבחור סוג השירות כנדרש.'
//   })
//   builder.addSingleSelectField({
//     name: 'rank',
//     label: label.people('rank'),
//     required: 'יש לבחור דרגה כנדרש.',
//     filter: (values /* Formik values object */) => (option /* React Select option */) => {
//       const { serviceType } = values
//       const { value } = option
//       switch (serviceType) {
//         case 'enlisted':
//           return value.startsWith('e') && value >= 'e1' && value <= 'e3'
//         case 'nco':
//           return value.startsWith('e') && value >= 'e3'
//         case 'officer':
//           return value.startsWith('o')
//       }
//     }
//   })
//   builder.addSingleSelectField({
//     name: 'activeRole',
//     required: 'יש לבחור את התפקיד כנדרש.',
//     label: label.people('activeRole'),
//     filter: (values /* Formik values object */) => (option /* React Select option*/) => {
//       return true // FIXME  eligible.activeRole[rank].includes(key)
//     }
//   })
//   builder.addMultiSelectField({
//     name: 'professions',
//     options: [],
//     filter: (values /* Formik values object */) => (option /* React Select option*/) => {
//       return true // FIXME  eligible.professions[rank].includes(key)
//     }
//   })
//   builder.addMultiSelectField({
//     name: 'licenses'
//   })
//   return builder.build()
// }

// export function genVehicleFormFields({ takenIds = [], initValues = {} }) {
//   const builder = new FormFieldsBuilder({ takenIds, initValues, labels: labels.vehicle })
//   builder.addFreeField({
//     name: 'plate',
//     required: 'יש למלא לוחית זיהוי כנדרש.',
//     matches: [
//       /^(?=[\u05E6\u05DE]?)\u05E6?\u05DE?\d{5,8}$/,
//       'לוחית זיהוי צריכה להיות רצף ספרות באורך 5-8, עם אפשרות לתחילית "מ" או "צ".'
//     ]
//   })
//   builder.addSingleSelectField({
//     name: 'type',
//     required: 'יש לבחור סוג רכב כנדרש.'
//   })
//   builder.addFreeField({
//     name: 'nickname',
//     matches: [/^[\u0590-\u05FF0-9\s]+$/, 'כינוי צריך להיות רצף אותיות בעברית ו/או ספרות.']
//   })
//   return builder.build()
// }
