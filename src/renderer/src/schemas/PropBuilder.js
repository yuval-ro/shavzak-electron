const DEFAULT_VALUE = {
  pk: false,
  required: true
}

export default class PropBuilder {
  constructor() {
    this.value = Object.assign({}, DEFAULT_VALUE)
  }
  sortable() {
    this.value.sortable = true
    return this
  }
  optional() {
    this.value.required = false
    return this
  }
  pk() {
    this.value.pk = true
    return this
  }
  label(label) {
    this.value.label = label
    return this
  }
  time() {
    this.value.time = true
    return this
  }
  options(options) {
    this.value.options = options
    this.value.multi = false
    return this
  }
  multi() {
    this.value.multi = true
    return this
  }
  matches(regex, description) {
    this.value.matches = [regex, description]
    return this
  }
  build() {
    const retval = this.value
    this.value = Object.assign({}, DEFAULT_VALUE)
    return retval
  }
}
