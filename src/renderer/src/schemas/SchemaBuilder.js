export default class SchemaBuilder {
  constructor(hebrew, primaryKey) {
    this.schema = { hebrew, primaryKey }
  }
  addFreeProperty({ name, hebrew, required, matches }) {
    if (!(name && hebrew && required)) {
      throw new Error()
    }
    this.schema = {
      ...this.schema,
      [name]: {
        hebrew,
        required,
        matches: matches ?? new RegExp()
      }
    }
    return this
  }
  addSingleProperty({ name, hebrew, required, options }) {
    if (!(name && hebrew && required && options)) {
      throw new Error()
    }
    this.schema = {
      ...this.schema,
      [name]: {
        hebrew,
        required,
        oneOf: options
      }
    }
    return this
  }
  addMultiProperty({ name, hebrew, required, options }) {
    if (!(name && hebrew && required && options)) {
      throw new Error()
    }
    this.schema = {
      ...this.schema,
      [name]: {
        hebrew,
        required,
        anyOf: options
      }
    }
    return this
  }
  build() {
    return Object.freeze(this.schema)
  }
}
