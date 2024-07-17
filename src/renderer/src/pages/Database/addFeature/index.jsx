import AddModal from './AddModal'
import PersonForm from './PersonForm'
import VehicleForm from './VehicleForm'

import labels from '../../../hebrew_labels.json'

export function AddPersonModal({ show, onSave, onCancel }) {
  return (
    <AddModal
      show={show}
      labels={labels.person}
      title="הוסף שוטר"
      form={<PersonForm labels={labels?.person} onSubmit={onSave} />}
      onCancel={onCancel}
    />
  )
}

export function AddVehicleModal({ show, onSave, onCancel }) {
  return (
    <AddModal
      show={show}
      labels={labels.vehicle}
      title="הוסף רכב"
      form={<VehicleForm labels={labels?.vehicle} onSubmit={onSave} />}
      onCancel={onCancel}
    />
  )
}
