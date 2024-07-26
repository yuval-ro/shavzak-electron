import * as changeCase from 'change-case'
import * as changeKeys from 'change-case/keys'

export function toCamelCase(obj) {
  let result = Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [
      key,
      Array.isArray(val) ? val.map((el) => changeCase.camelCase(el)) : changeCase.camelCase(val)
    ])
  )
  result = changeKeys.camelCase(result, 3, { prefixCharacters: '_' })
  return result
}

export function toSnakeCase(obj) {
  let result = Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [
      key,
      Array.isArray(val) ? val.map((el) => changeCase.snakeCase(el)) : changeCase.snakeCase(val)
    ])
  )
  result = changeKeys.snakeCase(result, 3, { prefixCharacters: '_' })
  return result
}
