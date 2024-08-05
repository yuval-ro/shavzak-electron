import * as Yup from 'yup'

import { INPUT_TYPES } from './CONSTS.js'

export default class FieldArray {
  constructor(existingValues = {}) {
    this.existingValues = existingValues
    this.fields = []
  }
  addFreeField({ name, label, required, validation, matches }) {
    if (!name) {
      throw new Error(this.args, 'Missing name')
    }
    const field = {
      name,
      inputType: INPUT_TYPES.free,
      initValue: this.existingValues[name] ?? '',
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
    // FIXME
    // if (this.takenIds.length > 0) {
    //   field.validation = field.validation.notOneOf(this.takenIds, 'ערך זה כבר קיים.')
    // }
    this.fields.push(field)
  }
  addSelectField({ multi, name, label, required, validation, options, filter }) {
    if (!name) {
      throw new Error(this.args, 'Missing name')
    }
    if (!options) {
      throw new Error(this.args, 'Missing options')
    }
    const field = {
      name,
      inputType: multi ? INPUT_TYPES.multiSelect : INPUT_TYPES.singleSelect,
      initValue: this.existingValues[name] ?? (multi ? [] : ''),
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
