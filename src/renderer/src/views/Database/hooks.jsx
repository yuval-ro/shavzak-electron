import { Modal } from '#src/components'
import Table from './Table'

function createFormFieldArray({ schema, docs, values, exclude }) {
  const fieldArray = new Modal.Form.FieldArray(values)
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

export function useTable({ schema, collection, shift, keywordFilter }) {
  const cols = Object.entries(schema?.props).map(([key, value]) => ({
    name: key,
    label: value?.label,
    options: value?.options ?? null,
    sortable: value?.sortable ?? false
  }))
  const rows = collection?.docs?.map((doc) =>
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
  return <Table cols={cols} rows={rows} shift={shift} keyword={keywordFilter} />
}

export function useModal(schema, collection) {
  return {
    creation: () => (
      <Modal.Form
        title="יצירת רשומה חדשה"
        fieldArray={createFormFieldArray({
          schema,
          docs: collection?.docs
        })}
        onSubmit={(values) => {
          collection?.put(values)
        }}
      />
    ),
    editing: (docId) => {
      const doc = collection?.get(docId)
      return (
        <Modal.Form
          title="עריכת רשומה קיימת"
          fieldArray={createFormFieldArray({ schema, docs: collection?.docs, values: doc })}
          onSubmit={(values) => {
            const updated = { ...doc, ...values }
            if (JSON.stringify(updated) !== JSON.stringify(doc)) {
              collection?.put(updated)
            }
          }}
        />
      )
    },
    removal: (docId) => {
      const doc = collection?.get(docId)
      return (
        <Modal.Confirm
          title="מחיקת רשומה"
          message="האם אתה מעוניין למחוק את הרשומה? הפעולה איננה הפיכה!"
          onConfirm={() => collection?.remove(doc)}
        />
      )
    }
  }
}
