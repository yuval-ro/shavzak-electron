import AddModal from './AddModal'
import PersonForm from './PersonForm'
import VehicleForm from './VehicleForm'

export function AddPersonModal({ onSave, onCancel }) {
  return <AddModal title="הוסף שוטר" form={<PersonForm onSubmit={onSave} />} onCancel={onCancel} />
}

export function AddVehicleModal({ onSave, onCancel }) {
  return <AddModal title="הוסף רכב" form={<VehicleForm onSubmit={onSave} />} onCancel={onCancel} />
}
