import { useState } from 'react'
import * as crud from './crud-feature'
import Table from './table-feature'
import Toolbar from './Toolbar'
import labels from '#src/labels.json'

export default function Main({ data, dbOps }) {
  const [modal, setModal] = useState(null)
  const [activeTab, setActiveTab] = useState('people')
  const [keywordFilter, setKeywordFilter] = useState('')

  function handleAddButtonClick() {
    if (activeTab === 'people') {
      setModal(modals.person.create())
    } else if (activeTab === 'vehicles') {
      setModal(modals.vehicle.create())
    } else {
      throw new Error()
    }
  }

  function handleEditClick(collection, entry) {
    setModal(modals[collection].edit(entry))
  }

  function handleDeleteClick(collection, entry) {
    setModal(modals[collection].delete(entry))
  }

  function handleModalConfirmDelete(collection, entry) {
    dbOps.delete(collection, entry)
    setModal(null)
  }

  function handleModalSave(collection, entry) {
    dbOps.post(collection, entry)
    setModal(null)
  }

  function handleModalCancel() {
    setModal(null)
  }

  const modals = {
    people: {
      create: () => (
        <crud.EditEntryModal
          mode="new"
          type="person"
          form={
            <crud.PersonForm
              takenIds={data?.people.map((person) => person?.serviceNumber)}
              onSubmit={(values) => handleModalSave('people', values)}
            />
          }
          onCancel={handleModalCancel}
        />
      ),
      edit: (entry) => (
        <crud.EditEntryModal
          mode="existing"
          type="person"
          form={
            <crud.PersonForm
              takenIds={data?.people
                .map((person) => person.serviceNumber)
                .filter((sn) => sn !== entry.serviceNumber)}
              onSubmit={(values) => handleModalSave('people', values)}
              initValues={entry}
            />
          }
          onCancel={handleModalCancel}
        />
      ),
      delete: (entry) => (
        <crud.DeleteEntryModal
          type="person"
          onConfirm={() => handleModalConfirmDelete('people', entry)}
          onCancel={handleModalCancel}
        />
      )
    },
    vehicles: {
      create: () => (
        <crud.EditEntryModal
          mode="new"
          type="vehicle"
          form={
            <crud.VehicleForm
              takenIds={data?.vehicles.map((vehicle) => vehicle.plate)}
              onSubmit={(values) => handleModalSave('vehicles', values)}
            />
          }
          onCancel={handleModalCancel}
        />
      ),
      edit: (entry) => (
        <crud.EditEntryModal
          mode="existing"
          type="vehicle"
          form={
            <crud.VehicleForm
              takenIds={data?.vehicles
                .map((vehicle) => vehicle.plate)
                .filter((plate) => plate !== entry.plate)}
              onSubmit={(values) => handleModalSave('vehicles', values)}
              initValues={entry}
            />
          }
          onCancel={handleModalCancel}
        />
      ),
      delete: (entry) => (
        <crud.DeleteEntryModal
          type="vehicle"
          onConfirm={() => handleModalConfirmDelete('vehicles', entry)}
          onCancel={handleModalCancel}
        />
      )
    }
  }

  const tableStyle = {
    border: '1px solid lightgray',
    borderRadius: '8px',
    marginTop: '10px'
  }

  const tabs = {
    people: (
      <Table
        collection="people"
        rubricNames={[
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
        entries={data.people.filter(({ serviceNumber, firstName, lastName }) =>
          [serviceNumber, firstName, lastName].some((item) => item && item.includes(keywordFilter))
        )}
        labels={labels.person}
        labelFn={({ firstName, lastName, rank }) =>
          labels.person.rank[rank] + ' ' + firstName + ' ' + lastName
        }
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        style={tableStyle}
      />
    ),
    vehicles: (
      <Table
        collection="vehicles"
        rubricNames={['plate', 'type', 'nickname']}
        entries={data.vehicles.filter(({ plate, nickname }) =>
          [plate, nickname].some((item) => item && item.includes(keywordFilter))
        )}
        labels={labels.vehicle}
        labelFn={(vehicle) => `${labels.vehicle.type[vehicle?.type]}, ${vehicle?.plate}`}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        style={tableStyle}
      />
    )
  }

  return (
    <>
      {modal}
      <Toolbar
        onSearchChange={(keyword) => setKeywordFilter(keyword)}
        onAddClick={(values) => handleAddButtonClick('people', values)}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />
      {tabs[activeTab]}
    </>
  )
}
