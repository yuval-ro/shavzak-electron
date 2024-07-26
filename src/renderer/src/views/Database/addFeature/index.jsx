import Modal from './Modal'
import PersonForm from './forms/PersonForm'
// import VehicleForm from './forms/VehicleForm'

export function AddPersonModal({ takenIds, onSave, onCancel }) {
  return (
    <Modal
      mode="new"
      type="person"
      form={<PersonForm takenIds={takenIds} onSubmit={onSave} />}
      onCancel={onCancel}
    />
  )
}

export function AddVehicleModal({ takenIds, onSave, onCancel }) {
  return (
    <Modal
      mode="new"
      type="vehicle"
      // form={<VehicleForm takenIds={takenIds} onSubmit={onSave} />}
      form={null} // TODO Update
      onCancel={onCancel}
    />
  )
}

export function EditPersonModal({ takenIds, initValues, onSave, onCancel }) {
  return (
    <Modal
      mode="existing"
      type="person"
      form={<PersonForm takenIds={takenIds} initValues={initValues} onSubmit={onSave} />}
      onCancel={onCancel}
    />
  )
}

export function EditVehicleModal({ takenIds, initValues, onSave, onCancel }) {
  return (
    <Modal
      mode="existing"
      type="vehicle"
      // form={<VehicleForm takenIds={takenIds} initValues={initValues} onSubmit={onSave} />}
      form={null} // TODO Update
      onCancel={onCancel}
    />
  )
}
