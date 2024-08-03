import { default as Person } from './Person.js'
import { default as Vehicle } from './Vehicle.js'
const label = Object.freeze({
  person: (person) =>
    `${Person.properties.rank.oneOf[person.rank]} ${person.firstName} ${person.lastName}`,
  vehicle: (vehicle) => `${Vehicle.properties.type.oneOf[vehicle.type]} ${vehicle.plate}`
})
export { Person, Vehicle, label }
