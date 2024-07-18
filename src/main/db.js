import PouchDB from 'pouchdb'

const db = {
  people: new PouchDB('db/people'),
  vehicles: new PouchDB('db/vehicles')
}
const id = {
  people: 'service_number',
  vehicles: 'plate_number'
}

function validateCollection(collection) {
  if (!Object.keys(db).includes(collection)) {
    throw new Error(`Unknown collection: "${collection}"`)
  }
}

export function validate(handler) {
  return async (event, collection, ...args) => {
    validateCollection(collection)
    return handler(event, collection, ...args)
  }
}

async function readAll(_, collection) {
  const query = await db[collection].allDocs({ include_docs: true })
  return query?.rows?.map((row) => row.doc)
}

async function putOne(_, collection, doc) {
  if (!doc._id) {
    doc._id = doc[id[collection]] // Attach ID
  }
  var query = await db[collection].put(doc)
  query = await db[collection].get(query?.id)
  return query
}

async function deleteOne(_, collection, doc) {
  const query = await db[collection].remove(doc)
  return query?.id
}

export const middleware = {
  validate
}

export const handlers = {
  readAll,
  putOne,
  deleteOne
}
