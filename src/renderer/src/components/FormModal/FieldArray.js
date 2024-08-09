import * as Yup from 'yup'

import { INPUT_TYPES } from './CONSTS.js'

export default class FieldArray {
  constructor(values = {}) {
    this.values = values
    this.fields = []
  }
  addTextField({ name, label, required, validation, matches, pk, takenPKs }) {
    if (!name) {
      throw new Error(this.args, 'Missing name')
    }
    const field = {
      name,
      inputType: INPUT_TYPES.free,
      initValue: this.values[name] ?? '',
      label: label ?? name,
      required,
      validation: validation ?? Yup.string()
    }
    if (required) {
      field.validation = field.validation.required('יש למלא ' + field.label + ' כנדרש.')
    }
    if (matches) {
      const [regex, description] = matches
      field.validation = field.validation.matches(
        regex,
        field.label + ' צריך להיות ' + description + '.'
      )
    }
    if (pk && takenPKs) {
      field.validation = field.validation.notOneOf(takenPKs, 'ערך זה כבר קיים.')
    }
    this.fields.push(field)
  }
  addSelectField({ name, label, required, validation, options, multi, filter }) {
    if (!name) {
      throw new Error(this.args, 'Missing name')
    }
    if (!options) {
      throw new Error(this.args, 'Missing options')
    }
    const field = {
      name,
      inputType: multi ? INPUT_TYPES.multiSelect : INPUT_TYPES.singleSelect,
      initValue: this.values[name] ?? (multi ? [] : ''),
      label: label ?? name,
      required,
      validation: validation ?? multi ? Yup.array().of(Yup.string()) : Yup.string(),
      options: Object.entries(options).map(([key, value]) => ({
        value: key,
        label: value
      })),
      filter: filter ?? ((values) => true)
    }
    if (required) {
      field.validation = multi
        ? field.validation.required().min(1, 'יש לבחור לפחות אופציה אחת.')
        : field.validation.required('יש לבחור אופציה.')
    }
    this.fields.push(field)
  }
  addTimeField({ name, label, required, validation }) {
    if (!this.values.start?.getHours) {
      this.values.start = new Date(this.values.start)
    }
    if (!this.values.end?.getHours) {
      this.values.end = new Date(this.values.end)
    }
    const { start, end } = this.values
    const diff = end.getHours() - start.getHours()
    const options = [...Array(diff + 1).keys()].map((hr) => {
      let d = new Date(start)
      d.setHours(start.getHours() + hr, 0, 0, 0)
      return {
        value: d,
        label: d.toLocaleTimeString('he-IL', { hour: 'numeric', minute: 'numeric' })
      }
    })
    const field = {
      name,
      inputType: INPUT_TYPES.singleSelect,
      initValue: this.values[name] ?? options[0],
      label: label ?? name,
      required,
      validation: validation ?? Yup.date(),
      options
    }
    if (required) {
      field.validation = field.validation.required('יש לבחור שעה.')
    }
    this.fields.push(field)
  }
  getInitValues() {
    return Object.fromEntries(this.fields.map((field) => [field.name, field.initValue]))
  }
  getValidSchema() {
    return Yup.object().shape(
      Object.fromEntries(this.fields.map((field) => [field.name, field.validation]))
    )
  }
  getFields() {
    return this.fields
  }
}
