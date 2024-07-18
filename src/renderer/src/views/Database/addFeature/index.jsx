import Modal from './Modal'
import PersonForm from './forms/PersonForm'
import VehicleForm from './forms/VehicleForm'

export function AddPersonModal({ takenIds, onSave, onCancel }) {
  return (
    <Modal
      title="הוספת רשומה חדשה - שוטר"
      form={<PersonForm takenIds={takenIds} onSubmit={onSave} />}
      onCancel={onCancel}
    />
  )
}

export function AddVehicleModal({ takenIds, onSave, onCancel }) {
  return (
    <Modal
      title="הוספת רשומה חדשה - רכב"
      form={<VehicleForm takenIds={takenIds} onSubmit={onSave} />}
      onCancel={onCancel}
    />
  )
}

export function EditPersonModal({ takenIds, initValues, onSave, onCancel }) {
  return (
    <Modal
      title="עריכת רשומה קיימת - שוטר"
      form={<PersonForm takenIds={takenIds} initValues={initValues} onSubmit={onSave} />}
      onCancel={onCancel}
    />
  )
}

export function EditVehicleModal({ takenIds, initValues, onSave, onCancel }) {
  return (
    <Modal
      selfId={initValues._id}
      title="עריכת רשומה קיימת - רכב"
      form={<VehicleForm takenIds={takenIds} initValues={initValues} onSubmit={onSave} />}
      onCancel={onCancel}
    />
  )
}
