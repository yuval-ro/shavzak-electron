/**
 * @file /src/views/database/Main.jsx
 */
import { useState } from 'react'

import Table from './Table'
import labels from '#src/labels.json'
import Toolbar from '#src/components/Toolbar.jsx'
import ConfirmModal from '#src/components/ConfirmModal.jsx'
import { TabContainer, ToolbarContainer } from '#src/components/styled.jsx'
import { Modal, Form } from '#src/components/form-modal'
import { buildPersonFormRubrics, buildVehicleFormRubrics } from './helpers.js'

export default function Main({ data, db }) {
  const [modal, setModal] = useState(null)
  const [activeTab, setActiveTab] = useState('people')
  const [keywordFilter, setKeywordFilter] = useState('')

  function handleEditClick(collection, entry) {
    setModal(modals[collection].edit(entry))
  }

  function handleDeleteClick(collection, entry) {
    setModal(modals[collection].delete(entry))
  }

  function handleModalConfirmDelete(collection, entry) {
    db.delete(collection, entry)
    setModal(null)
  }

  function handleCreateModalSave(collection, entry) {
    db.create(collection, entry)
    setModal(null)
  }

  function handleEditModalSave(collection, entry) {
    db.update(collection, entry)
    setModal(null)
  }

  function handleModalCancel() {
    setModal(null)
  }

  function handleAddButtonClick() {
    setModal(modals[activeTab].create())
  }

  const modals = {
    people: {
      create: () => (
        <Modal
          title="יצירת רשומה חדשה - שוטר"
          form={
            <Form
              rubrics={buildPersonFormRubrics({
                takenIds: data?.people.map((person) => person?.serviceNumber)
              })}
              onSubmit={(values) => handleCreateModalSave('people', values)}
            />
          }
          onCancel={handleModalCancel}
        />
      ),
      edit: (entry) => (
        <Modal
          title="עריכת רשומה קיימת - שוטר"
          form={
            <Form
              rubrics={buildPersonFormRubrics({
                takenIds: data?.people
                  .map((person) => person.serviceNumber)
                  .filter((sn) => sn !== entry.serviceNumber),
                initValues: entry
              })}
              onSubmit={(values) => handleEditModalSave('people', { ...entry, ...values })}
            />
          }
          onCancel={handleModalCancel}
        />
      ),
      delete: (entry) => (
        <ConfirmModal
          title="מחיקת רשומה - שוטר"
          message="האם אתה בטוח למחוק את הרשומה? הפעולה אינה הפיכה."
          onConfirm={() => handleModalConfirmDelete('people', entry)}
          onCancel={handleModalCancel}
        />
      )
    },
    vehicles: {
      create: () => (
        <Modal
          title="יצירת רשומה חדשה - רכב"
          form={
            <Form
              rubrics={buildVehicleFormRubrics({
                takenIds: data?.vehicles.map((vehicle) => vehicle.plate)
              })}
              onSubmit={(values) => handleCreateModalSave('vehicles', values)}
            />
          }
          onCancel={handleModalCancel}
        />
      ),
      edit: (entry) => (
        <Modal
          title="עריכת רשומה קיימת - רכב"
          form={
            <Form
              rubrics={buildVehicleFormRubrics({
                takenIds: data?.vehicles
                  .map((vehicle) => vehicle.plate)
                  .filter((plate) => plate !== entry.plate),
                initValues: entry
              })}
              onSubmit={(values) => handleEditModalSave('vehicles', { ...entry, ...values })}
            />
          }
          onCancel={handleModalCancel}
        />
      ),
      delete: (entry) => (
        <ConfirmModal
          title="מחיקת רשומה - רכב"
          message="האם אתה בטוח למחוק את הרשומה? הפעולה אינה הפיכה."
          onConfirm={() => handleModalConfirmDelete('vehicles', entry)}
          onCancel={handleModalCancel}
        />
      )
    }
  }

  const tabs = {
    people: {
      title: 'כוח אדם',
      component: (
        <Table
          collection="people"
          defaultRubric="affiliation"
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
            [serviceNumber, firstName, lastName].some(
              (item) => item && item.includes(keywordFilter)
            )
          )}
          labels={labels.person}
          labelFn={({ firstName, lastName, rank }) =>
            labels.person.rank[rank] + ' ' + firstName + ' ' + lastName
          }
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          customSort={{
            affiliation: (direction) => (a, b) => {
              // First, sort by affiliation
              if (a.affiliation < b.affiliation) return direction === 'ascending' ? -1 : 1
              if (a.affiliation > b.affiliation) return direction === 'ascending' ? 1 : -1
              // If serviceType is the same, sort by rank
              const rankA = a.rank
              const rankB = b.rank
              if (rankA < rankB) return direction === 'ascending' ? 1 : -1
              if (rankA > rankB) return direction === 'ascending' ? -1 : 1
              return 0
            }
          }}
        />
      )
    },
    vehicles: {
      title: 'רכבים',
      component: (
        <Table
          defaultRubric="plate"
          collection="vehicles"
          rubricNames={['plate', 'type', 'nickname']}
          entries={data.vehicles.filter(({ plate, nickname }) =>
            [plate, nickname].some((item) => item && item.includes(keywordFilter))
          )}
          labels={labels.vehicle}
          labelFn={(vehicle) => `${labels.vehicle.type[vehicle.type]}, ${vehicle.plate}`}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      )
    }
  }

  return (
    <>
      {modal}
      <ToolbarContainer>
        <Toolbar
          tabs={tabs}
          onSearchChange={(keyword) => setKeywordFilter(keyword)}
          onAddClick={() => setModal(modals[activeTab].create())}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          onAddButtonClick={handleAddButtonClick}
        />
      </ToolbarContainer>
      <TabContainer>
        {Object.entries(tabs).map(([tabName, { component }], idx) => (
          <div key={idx} style={{ display: activeTab === tabName ? 'block' : 'none' }}>
            {component}
          </div>
        ))}
      </TabContainer>
    </>
  )
}
