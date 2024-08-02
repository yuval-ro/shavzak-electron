import { INPUT_TYPES } from './Form'
import * as Yup from 'yup'

export default class RubricsBuilder {
  constructor(initValues = {}, takenIds = [], labels = {}) {
    this.initValues = initValues
    this.takenIds = takenIds
    this.labels = labels
    this.rubrics = {}
  }
  addFree({ name, label, required, matches, validation }) {
    this.rubrics = {
      ...this.rubrics,
      [name]: {
        inputType: INPUT_TYPES.free,
        label: label ?? this.labels[name]?._title ?? name,
        required,
        validation: validation ?? Yup.string().trim()
      }
    }
    if (required) {
      const validation = this.rubrics[name].validation
      this.rubrics[name].validation = validation.required(required)
    }
    if (matches) {
      const validation = this.rubrics[name].validation
      this.rubrics[name].validation = validation.matches(...matches)
    }
    if (this.takenIds.length > 0) {
      const validation = this.rubrics[name].validation
      this.rubrics[name].validation = validation.notOneOf(this.takenIds, 'ערך זה כבר קיים.')
    }
  }
  addSingleSelect({ name, label, required, validation, optionFilter }) {
    this.rubrics = {
      ...this.rubrics,
      [name]: {
        inputType: INPUT_TYPES.singleSelect,
        label: label ?? this.labels[name]?._title ?? name,
        required,
        validation: validation ?? Yup.string().trim(),
        getOptions: () => {
          let options = Object.entries(this.labels[name]).filter(
            ([key, val]) => !key.startsWith('_')
          )
          if (optionFilter) {
            options = options.filter(optionFilter)
          }
          return options.map(([key, val]) => ({ value: key, label: val }))
        }
      }
    }
    if (required) {
      const validation = this.rubrics[name].validation
      this.rubrics[name].validation = validation.required(required)
    }
  }
  addMultiSelect({ name, label, required, validation, optionFilter }) {
    this.rubrics = {
      ...this.rubrics,
      [name]: {
        inputType: INPUT_TYPES.multiSelect,
        label: label ?? this.labels[name]?._title ?? name,
        required,
        validation: validation ?? Yup.string().trim(),
        getOptions: () => {
          let options = Object.entries(this.labels[name]).filter(
            ([key, val]) => !key.startsWith('_')
          )
          if (optionFilter) {
            options = options.filter(optionFilter)
          }
          return options.map(([key, val]) => ({ value: key, label: val }))
        }
      }
    }
    if (required) {
      const validation = this.rubrics[name].validation
      this.rubrics[name].validation = validation.required(required)
    }
  }
  build() {
    return this.rubrics
  }
}
