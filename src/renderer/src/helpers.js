import { FieldArray } from '#src/components/FormModal'

export function createFormFieldArray({ schema, docs, values, exclude }) {
  const fieldArray = new FieldArray(values)
  Object.entries(schema?.props)
    .filter(([propName]) => !exclude?.includes(propName))
    .forEach(([propName, propDefinition]) => {
      const { matches, options, pk, time } = propDefinition
      let arg = { ...propDefinition, name: propName }
      if (time) {
        return fieldArray.addTimeField(arg)
      } else if (matches && !options) {
        if (pk) {
          arg.takenPKs = docs?.map((doc) => doc[propName])
          if (values) {
            arg.takenPKs = arg.takenPKs.filter((pk) => pk !== values[propName])
          }
        }
        return fieldArray.addTextField(arg)
      } else if (options && !matches) {
        return fieldArray.addSelectField(arg)
      } else {
        throw new Error()
      }
    })
  return fieldArray
}

export function createTableCols(schema, innerSort = {}, unsortable = {}) {
  return Object.entries(schema?.props).map(([name, { label }]) => ({
    name,
    label,
    sortable: unsortable[name] ?? true,
    innerSort: innerSort[name] ?? null
  }))
}

export function createTableRows(schema, docs) {
  const result = docs.map((doc) =>
    Object.fromEntries([
      ...Object.entries(doc).map(([key, value]) => {
        if (key.startsWith('_')) {
          return [key, value]
        }
        const prop = schema?.props[key]
        return [
          key,
          Array.isArray(value)
            ? value.map((item) => ({ value: item, label: prop.options[item] }))
            : prop?.options
              ? { value, label: prop.options[value] }
              : { value }
        ]
      }),
      ['label', schema?.stringify(doc)]
    ])
  )
  return result
}
