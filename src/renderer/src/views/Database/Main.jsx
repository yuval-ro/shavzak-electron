import { useState } from 'react'

import { AddPersonModal, EditPersonModal, AddVehicleModal, EditVehicleModal } from './addFeature'
import ConfirmModal from './ConfirmModal'
import Table from './Table'
import Toolbar from './Toolbar'
import labels from '#src/labels.json'

export default function Main({ data, onPost, onDelete }) {
  const [confirmModal, setConfirmModal] = useState(null)
  const [itemModal, setEntryModal] = useState(null)
  const [activeTab, setActiveTab] = useState('people')
  const [keywordFilter, setKeywordFilter] = useState('')

  const labelFn = {
    people: ({ firstName, lastName, rank }) =>
      labels.person.rank[rank] + ' ' + firstName + ' ' + lastName,
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
          onSave={(values) => handleFormModalOk('people', values)}
          onCancel={handleFormModalCancel}
        />
      )
    } else if (activeTab === 'vehicles') {
      setEntryModal(
        <AddVehicleModal
          takenIds={data?.vehicles.map((vehicle) => vehicle._id)}
          onSave={(values) => handleFormModalOk('vehicles', values)}
          onCancel={handleFormModalCancel}
        />
      )
    } else {
      setEntryModal(null)
    }
  }

  function handleFormModalOk(collection, doc) {
    console.debug({doc})
    // onPost(collection, doc)
    setEntryModal(null)
  }

  function handleFormModalCancel() {
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
          onSave={(values) => handleFormModalOk('people', values)}
          onCancel={handleFormModalCancel}
        />
      )
    } else if (collection === 'vehicles') {
      setEntryModal(
        <EditVehicleModal
          takenIds={data?.vehicles
            .map((vehicle) => vehicle._id)
            .filter((id) => id !== existingValues._id)}
          initValues={existingValues}
          onSave={(values) => handleFormModalOk('vehicles', values)}
          onCancel={handleFormModalCancel}
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

  function handleTabChange(selectedTab) {
    setActiveTab(selectedTab)
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

  const tabs = {
    people: (
      <Table
        style={tableStyle}
        rubrics={[
          'affiliation',
          'serviceNumber',
          'firstName',
          'lastName',
          'sex',
          'serviceType',
          'rank',
          'activeRole',
          'professions',
          'licenses'
        ]}
        data={filterPeople(data.people)} // TODO Implement filter according to keywordFilter (if it is not '')
        labels={labels.person}
        labelFn={labelFn.people}
        onEdit={(person) => handleEditContextMenu('people', person)}
        onDelete={(person) => handleDeleteContextMenu('people', person)}
      />
    ),
    vehicles: null
    // <Table
    //   rubrics={[
    //     { key: 'plate_number', translate: false },
    //     { key: 'type', translate: true },
    //     { key: 'seats', translate: false }
    //   ]}
    //   data={filterVehicles(data?.vehicles)} // TODO Implement filter according to keywordFilter (if it is not '')
    //   labels={labels.vehicle}
    //   sortFn={(a, b) => {
    //     if (a.type < b.type) return -1
    //     if (a.type > b.type) return 1
    //     if (a.plate_number < b.plate_number) return -1
    //     if (a.plate_number > b.plate_number) return 1
    //     return 0
    //   }}
    //   abbreviated={true}
    //   labelFn={labelFn.vehicles}
    //   onEdit={(vehicle) => handleEditContextMenu('vehicles', vehicle)}
    //   onDelete={(vehicle) => handleDeleteContextMenu('vehicles', vehicle)}
    //   style={tableStyle}
    // />
  }

  return (
    <>
      {confirmModal}
      {itemModal}
      <Toolbar
        onSearchChange={handleSearchChange}
        onAddClick={(values) => handleAddButtonClick('people', values)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      {tabs[activeTab]}
    </>
  )
}
