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
      validation: validation ?? Yup.string().trim()
    }
    if (required) {
      // TODO Add required message
      field.validation = field.validation.required()
    }
    if (matches) {
      field.validation = field.validation.matches(...matches)
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
      validation: validation ?? Yup.string().trim(),
      options: Object.entries(options).map(([key, value]) => ({
        value: key,
        label: value
      })),
      filter: filter ?? ((values) => true)
    }
    if (required) {
      // TODO Add required message
      field.validation = field.validation.required()
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
