import { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import { AddPersonModal, EditPersonModal, AddVehicleModal, EditVehicleModal } from './addFeature'
import ConfirmModal from './ConfirmModal'
import Table from './Table'
import ControlRow from './ControlRow'
import labels from '#src/labels.json'

export default function Main({ data, onPost, onDelete }) {
  const [confirmModal, setConfirmModal] = useState(null)
  const [itemModal, setEntryModal] = useState(null)
  const [activeTab, setActiveTab] = useState('people')
  const [keywordFilter, setKeywordFilter] = useState('')

  const labelFn = {
    people: (person) =>
      `${labels.person.rank[person?.rank][1] ?? labels.person.rank[person?.rank][0]} ${person?.first_name} ${person?.last_name}`,
    vehicles: (vehicle) => `${labels.vehicle.type[vehicle?.type]}, ${vehicle?.plate_number}`
  }

  function handleSearchChange(keyword) {
    setKeywordFilter(keyword)
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

  function filterPeople(people) {
    var result = people
    if (keywordFilter !== '') {
      result = result.filter(({ service_number, first_name, last_name }) =>
        [service_number, first_name, last_name].some((item) => item && item.includes(keywordFilter))
      )
    }
    return result
  }

  function filterVehicles(vehicles) {
    var result = vehicles
    if (keywordFilter !== '') {
      result = result.filter(({ plate_number, type }) =>
        [plate_number, labels.vehicle.type[type]].some(
          (item) => item && item.includes(keywordFilter)
        )
      )
    }
    return result
  }

  const tableStyle = {
    border: '1px solid lightgray',
    borderRadius: '8px',
    marginTop: '10px'
  }

  return (
    <div>
      {confirmModal}
      {itemModal}
      <Tabs
        variant="pills"
        defaultActiveKey="people"
        onSelect={(key) => {
          setActiveTab(key)
        }}
        style={{ paddingRight: '0px' }}
      >
        <Tab eventKey="people" title="כוח אדם">
          <ControlRow
            onSearchChange={handleSearchChange}
            onAddClick={(values) => handleAddButtonClick('people', values)}
            style={{ marginTop: '15px' }}
          />
          <Table
            style={tableStyle}
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
            data={filterPeople(data?.people)} // TODO Implement filter according to keywordFilter (if it is not '')
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
        <Tab eventKey="vehicles" title="רכבים" style={{ width: '100%' }}>
          <ControlRow
            onSearchChange={handleSearchChange}
            onAddClick={(values) => handleAddButtonClick('vehicles', values)}
            style={{ marginTop: '15px' }}
          />
          <Table
            cols={[
              { key: 'plate_number', translate: false },
              { key: 'type', translate: true },
              { key: 'seats', translate: false }
            ]}
            data={filterVehicles(data?.vehicles)} // TODO Implement filter according to keywordFilter (if it is not '')
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
            style={tableStyle}
          />
        </Tab>
      </Tabs>
    </div>
  )
}
