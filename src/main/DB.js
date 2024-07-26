/**
 * @file /src/main/db.js
 */
import PouchDB from 'pouchdb'

export class DB {
  constructor() {
    this.collections = {
      people: {
        id: 'service_number',
        pouch: new PouchDB('db/people')
      },
      vehicles: {
        id: 'plate_number',
        pouch: new PouchDB('db/vehicles')
      }
    }
    this.requests = []
  }
  handle(request) {
    if (!this.collections[request.collection]) {
      throw new Error(`Unknown collection: "${request.collection}"`)
    }
    this.requests.unshift({
      id: crypto.randomUUID(),
      collection: request.collection,
      body: request.body ?? {},
      response: {}
    })
    return this
  }
  async readAll() {
    const { collection } = this.requests[0]
    const query = await this.collections[collection].pouch.allDocs({ include_docs: true })
    this.requests[0].response = query
    return query?.rows?.map((row) => row.doc)
  }
  async putOne() {
    const { collection, body } = this.requests[0]
    let query = await this.collections[collection].pouch.put(body)
    query = await this.collections[collection].pouch.get(query?.id)
    this.requests[0].response = query
    return query
  }
  async deleteOne() {
    const { collection, body } = this.requests[0]
    const query = await this.collections[collection].pouch.remove(body)
    this.requests[0].response = query
    return query
  }
}
