import PouchDB from 'pouchdb'
import chalk from 'chalk'

class RequestLogger {
  constructor({ collection, action }) {
    this.id = crypto.randomUUID()
    this.collection = collection
    this.action = String(action).toUpperCase()
    const emojiRange = 0x1f64f - 0x1f600
    const emojiHash = Number('0x' + this.id.slice(this.id.length - 12, this.id.length)) % emojiRange
    this.emoji = String.fromCodePoint(0x1f600 + emojiHash)
  }
  timestamp() {
    const date = new Date()
    return (
      String(date.getHours()).padStart(2, '0') +
      ':' +
      String(date.getMinutes()).padStart(2, '0') +
      ':' +
      String(date.getSeconds()).padStart(2, '0') +
      '.' +
      String(date.getMilliseconds()).padStart(3, '0')
    )
  }
  resolve(code) {
    console.log(
      [
        chalk.gray(`[${this.timestamp()}]`),
        chalk.cyan(`[${this.id} ${this.emoji}]`),
        chalk.yellow(this.action),
        chalk.white(this.collection),
        chalk.green(`RESOLVED ${code}`)
      ].join(' ')
    )
  }
  reject(code) {
    console.log(
      [
        chalk.gray('[' + this.timestamp() + ']'),
        chalk.cyan(`[${this.id} ${this.emoji}]`),
        chalk.yellow(this.action),
        chalk.white(this.collection),
        chalk.red(`REJECTED ${code}`)
      ].join(' ')
    )
  }
}

const DB = Object.freeze({
  people: new PouchDB('db/people'),
  vehicles: new PouchDB('db/vehicles'),
  campTasks: new PouchDB('db/campTasks'),
  shifts: new PouchDB('db/shifts')
})

const HANDLERS = Object.freeze({
  read: async (pouch) => {
    const { rows } = await pouch.allDocs({ include_docs: true })
    return rows.map((row) => row.doc)
  },
  post: async (pouch, docs) => {
    console.debug(docs)
    await pouch.bulkDocs(docs)
  },
  delete: async (pouch, docs) => {
    await pouch.bulkDocs(docs.map((doc) => ({ ...doc, _deleted: true })))
  }
})

export async function dbController({ collection, action, docs }) {
  const logger = new RequestLogger({ collection, action })
  try {
    if (!(collection && action)) {
      const err = new Error('Missing required arguments')
      err.code = 400
      throw err
    }
    const pouch = DB[collection]
    if (!pouch) {
      const err = new Error(`Invalid collection: "${collection}"`)
      err.code = 400
      throw err
    }
    const handler = HANDLERS[action]
    if (!handler) {
      const err = new Error(`Invalid action: "${action}"`)
      err.code = 400
      throw err
    }
    const result = await handler(pouch, docs)
    logger.resolve(200)
    return result
  } catch (err) {
    console.error(err)
    logger.reject(err.code ?? 500)
    throw err
  }
}
