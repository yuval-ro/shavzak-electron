export async function fetch(collection) {
  const docs = await window.api.db({ collection, action: 'fetch' })
  return docs
}
export async function put(collection, docs) {
  await window.api.db({ collection, action: 'put', docs: Array.isArray(docs) ? docs : [docs] })
}
export async function remove(collection, docs) {
  await window.api.db({ collection, action: 'remove', docs: Array.isArray(docs) ? docs : [docs] })
}
