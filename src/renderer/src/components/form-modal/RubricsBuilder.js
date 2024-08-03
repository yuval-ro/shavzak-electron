import { INPUT_TYPES } from './Form'
import * as Yup from 'yup'

export default class RubricsBuilder {
  constructor({ initValues, takenIds }) {
    this.initValues = initValues ?? {}
    this.takenIds = takenIds ?? []
    this.rubrics = {}
  }
  addFree({ name, label, required, matches, validation }) {
    if (!name) {
      throw new Error()
    }
    const rubric = {
      inputType: INPUT_TYPES.singleSelect,
      initValue: this.initValues[name] ?? '',
      label: label ?? name,
      required,
      validation: validation ?? Yup.string().trim()
    }
    if (required) {
      rubric.validation = validation.required(required)
    }
    if (matches) {
      rubric.validation = rubric.validation.matches(...matches)
    }
    if (this.takenIds.length > 0) {
      rubric.validation = rubric.validation.notOneOf(this.takenIds, 'ערך זה כבר קיים.')
    }
    this.rubrics = {
      ...this.rubrics,
      [name]: rubric
    }
  }
  addSingleSelect({ name, label, required, validation, options, filter }) {
    if (!name) {
      throw new Error()
    }
    if (!options) {
      throw new Error()
    }
    const rubric = {
      inputType: INPUT_TYPES.singleSelect,
      initValue: this.initValues[name] ?? [],
      label: label ?? name,
      required,
      validation: validation ?? Yup.string().trim(),
      options,
      filter: filter ?? ((values) => true)
    }
    if (required) {
      rubric.validation = validation.required(required)
    }
    this.rubrics = {
      ...this.rubrics,
      [name]: rubric
    }
  }
  addMultiSelect({ name, label, required, validation, options, filter }) {
    if (!name) {
      throw new Error()
    }
    const rubric = {
      inputType: INPUT_TYPES.singleSelect,
      initValue: this.initValues[name] ?? [],
      label: label ?? name,
      required,
      validation: validation ?? Yup.string().trim(),
      options: options ?? [],
      filter: filter ?? ((values) => true)
    }
    if (required) {
      rubric.validation = validation.required(required)
    }
    this.rubrics = {
      ...this.rubrics,
      [name]: rubric
    }
  }
  build() {
    return this.rubrics
  }
}
