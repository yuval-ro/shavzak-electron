export const CM_ACTIONS = Object.freeze({
  setStatus: 'SET_STATUS',
  editEntry: 'EDIT_ENTRY',
  deleteEntry: 'DELETE_ENTRY'
})

// FIXME
// function getOrder(Schema, propName) {
//   return Object.freeze(
//     Object.fromEntries(Object.keys(Schema.props[propName]?.options).map((role, idx) => [role, idx]))
//   )
// }
// const ACTIVE_ROLE_ORDER = getOrder(PersonSchema, 'activeRole')
// const SERVICE_TYPE_ORDER = getOrder(PersonSchema, 'serviceType')

// const peopleInnerSort = {
//   affiliation: (sortDir) => (a, b) => {
//     if (a.affiliation.value > b.affiliation.value) return -sortDir
//     if (a.affiliation.value < b.affiliation.value) return sortDir
//     if (ACTIVE_ROLE_ORDER[a.activeRole.value] > ACTIVE_ROLE_ORDER[b.activeRole.value])
//       return sortDir
//     if (ACTIVE_ROLE_ORDER[a.activeRole.value] < ACTIVE_ROLE_ORDER[b.activeRole.value])
//       return -sortDir
//     if (SERVICE_TYPE_ORDER[a.serviceType.value] > SERVICE_TYPE_ORDER[b.serviceType.value])
//       return sortDir
//     if (SERVICE_TYPE_ORDER[a.serviceType.value] < SERVICE_TYPE_ORDER[b.serviceType.value])
//       return -sortDir
//     if (a.rank.value < b.rank.value) return sortDir
//     if (a.rank.value > b.rank.value) return -sortDir
//     return 0
//   }
// }