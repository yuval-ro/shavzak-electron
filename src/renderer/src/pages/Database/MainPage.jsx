import { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import Table from './Table'
import { AddPersonModal, EditPersonModal, AddVehicleModal, EditVehicleModal } from './addFeature'
import ControlRow from './ControlRow'
import ConfirmModal from './ConfirmModal'

import labels from '#src/labels.json'

export default function MainPage({ data, onPost, onDelete }) {
  const [confirmModal, setConfirmModal] = useState(null)
  const [itemModal, setEntryModal] = useState(null)
  const [activeTab, setActiveTab] = useState('people') // State to track the active tab
  const labelFn = {
    people: (person) =>
      `${labels.person.rank[person?.rank][1] ?? labels.person.rank[person?.rank][0]} ${person?.first_name} ${person?.last_name}`,
    vehicles: (vehicle) => `${labels.vehicle.type[vehicle?.type]}, ${vehicle?.plate_number}`
  }

  function handleAddButtonClick() {
    if (activeTab === 'people') {
      setEntryModal(
        <AddPersonModal
          takenIds={data?.people.map((person) => person._id)}
          onSave={(values) => handleEditModalOk('people', values)}
          onCancel={handleEditModalCancel}
        />
      )
    } else if (activeTab === 'vehicles') {
      setEntryModal(
        <AddVehicleModal
          takenIds={data?.vehicles.map((vehicle) => vehicle._id)}
          onSave={(values) => handleEditModalOk('vehicles', values)}
          onCancel={handleEditModalCancel}
        />
      )
    } else {
      setEntryModal(null)
    }
  }

  function handleEditModalOk(collection, item) {
    onPost(collection, item)
    setEntryModal(null)
  }

  function handleEditModalCancel() {
    setEntryModal(null)
  }

  function handleEditContextMenu(collection, existingValues) {
    if (collection === 'people') {
      setEntryModal(
        <EditPersonModal
          takenIds={data?.people
            .map((person) => person._id)
            .filter((id) => id !== existingValues._id)}
          initValues={existingValues}
          onSave={(values) => handleEditModalOk('people', values)}
          onCancel={handleEditModalCancel}
        />
      )
    } else if (collection === 'vehicles') {
      setEntryModal(
        <EditVehicleModal
          takenIds={data?.vehicles
            .map((vehicle) => vehicle._id)
            .filter((id) => id !== existingValues._id)}
          initValues={existingValues}
          onSave={(values) => handleEditModalOk('vehicles', values)}
          onCancel={handleEditModalCancel}
        />
      )
    } else {
      setEntryModal(null)
    }
  }

  function handleDeleteContextMenu(collection, item) {
    setConfirmModal(
      <ConfirmModal
        title={`מחיקת רשומה קיימת - ${collection === 'people' ? 'שוטר' : 'רכב'}`}
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
  }

  return (
    <>
      {confirmModal}
      {itemModal}
      <Tabs
        defaultActiveKey="people"
        className="px-0"
        onSelect={(key) => {
          setActiveTab(key)
        }}
      >
        <Tab eventKey="people" title="שוטרים">
          <ControlRow onAddClick={(values) => handleAddButtonClick('people', values)} />
          <Table
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
            data={data?.people}
            labels={labels.person}
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
            abbreviated={true}
            labelFn={labelFn.people}
            onEdit={(person) => handleEditContextMenu('people', person)}
            onDelete={(person) => handleDeleteContextMenu('people', person)}
          />
        </Tab>
        <Tab eventKey="vehicles" title="רכבים">
          <ControlRow onAddClick={(values) => handleAddButtonClick('vehicles', values)} />
          <Table
            cols={[
              { key: 'plate_number', translate: false },
              { key: 'type', translate: true },
              { key: 'seats', translate: false }
            ]}
            data={data?.vehicles}
            labels={labels.vehicle}
            sortFn={(a, b) => {
              if (a.type < b.type) return -1
              if (a.type > b.type) return 1
              if (a.plate_number < b.plate_number) return -1
              if (a.plate_number > b.plate_number) return 1
              return 0
            }}
            abbreviated={true}
            labelFn={labelFn.vehicles}
            onEdit={(vehicle) => handleEditContextMenu('vehicles', vehicle)}
            onDelete={(vehicle) => handleDeleteContextMenu('vehicles', vehicle)}
          />
        </Tab>
      </Tabs>
    </>
  )
}
