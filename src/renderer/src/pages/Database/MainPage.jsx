import { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import Table from './Table'
import { AddPersonModal, AddVehicleModal } from './addFeature'
import ControlRow from './ControlRow'
import ConfirmModal from './ConfirmModal'

import labels from '#src/labels.json'

export default function MainPage({ data, onAdd, onEdit, onDelete }) {
  const [confirmModal, setConfirmModal] = useState(null)
  const [deletionCandidate, setDeletionCandidate] = useState({})
  const [editModal, setEditModal] = useState(null)
  const [activeTab, setActiveTab] = useState('people') // State to track the active tab

  function handleAddButtonClick() {
    if (activeTab === 'people') {
      setEditModal(<AddPersonModal onSave={handleEditModalOk} onCancel={handleEditModalCancel} />)
    } else if (activeTab === 'vehicles') {
      setEditModal(<AddVehicleModal onSave={handleEditModalOk} onCancel={handleEditModalCancel} />)
    } else {
      setEditModal(null)
    }
  }

  function handleEditModalOk(values) {
    // TODO Implement
    console.debug({ values })
    setEditModal(null)
  }

  function handleEditModalCancel() {
    setEditModal(null)
  }

  function handleDeleteContextMenu(collection, item) {
    setConfirmModal(
      <ConfirmModal
        title="מחיקת רשומה"
        body={
          <div style={{ textAlign: 'center' }}>
            <span>האם אתה בטוח שאתה מעוניין למחוק את הרשומה?</span>
            <br />
            <span>הפעולה אינה הפיכה!</span>
            <br />
            <br />
            <span style={{ fontWeight: 'bold' }}>{labelFn[collection](item)}</span>
          </div>
        }
        onConfirm={() => {
          onDelete(collection, item)
          setConfirmModal(null)
        }}
        onCancel={() => setConfirmModal(null)}
        okButtonVariant="outline-danger"
      />
    )
    // TODO Call onDelete(collection, item)
  }

  const labelFn = {
    people: (person) =>
      `${labels.person.rank[person?.rank][1] ?? labels.person.rank[person?.rank][0]} ${person?.first_name} ${person?.last_name}`,
    vehicles: (vehicle) => `${labels.vehicle.type[vehicle?.type]}, ${vehicle?.plate_number}`
  }

  return (
    <>
      {confirmModal}
      {editModal}
      <Tabs
        defaultActiveKey="people"
        className="px-0"
        onSelect={(key) => {
          setActiveTab(key)
        }}
      >
        <Tab eventKey="people" title="שוטרים">
          <ControlRow onAddClick={handleAddButtonClick} />
          <Table
            onDelete={(person) => handleDeleteContextMenu('people', person)}
            onEdit={(person) => onEdit('people', person)}
            data={data?.people}
            cols={[
              { key: 'service_number', translate: false },
              { key: 'first_name', translate: false },
              { key: 'last_name', translate: false },
              { key: 'sex', translate: true },
              { key: 'service_type', translate: true },
              { key: 'rank', translate: true },
              { key: 'active_role', translate: true },
              { key: 'professions', translate: true },
              { key: 'licenses', translate: true },
              { key: 'affiliation', translate: true }
            ]}
            sortFn={(a, b) => {
              if (a.affiliation < b.affiliation) return -1
              if (a.affiliation > b.affiliation) return 1
              if (
                a.service_type === 'officer' &&
                (b.service_type === 'enlisted' || b.service_type === 'nco')
              )
                return -1
              if (
                b.service_type === 'officer' &&
                (a.service_type === 'enlisted' || a.service_type === 'nco')
              )
                return 1
              if (a.service_type === 'nco' && b.service_type === 'enlisted') return -1
              if (b.service_type === 'nco' && a.service_type === 'enlisted') return 1
              if (a.active_role === 'platoon_sergeant' && b.active_role === 'trooper') return -1
              if (b.active_role === 'platoon_sergeant' && a.active_role === 'trooper') return 1
              if (a.rank < b.rank) return 1
              if (a.rank > b.rank) return -1
              return a.first_name.localeCompare(b.first_name)
            }}
            labels={labels.person}
            abbreviated={true}
            onAddButtonClick={handleAddButtonClick}
            labelFn={labelFn.people}
          />
        </Tab>
        <Tab eventKey="vehicles" title="רכבים">
          <ControlRow onAddClick={handleAddButtonClick} />
          <Table
            onDelete={(vehicle) => handleDeleteContextMenu('vehicles', vehicle)}
            onEdit={(vehicle) => onEdit(vehicle)}
            data={data?.vehicles}
            cols={[
              { key: 'plate_number', translate: false },
              { key: 'type', translate: true },
              { key: 'seats', translate: false }
            ]}
            sortFn={(a, b) => {
              if (a.type < b.type) return -1
              if (a.type > b.type) return 1
              if (a.plate_number < b.plate_number) return -1
              if (a.plate_number > b.plate_number) return 1
              return 0
            }}
            labels={labels.vehicle}
            abbreviated={true}
            onAddButtonClick={handleAddButtonClick}
            labelFn={labelFn.vehicles}
          />
        </Tab>
      </Tabs>
    </>
  )
}
