/**
 * @file /src/views/database/Main.jsx
 */
import { useState } from 'react'

import { buildPersonFormRubrics, buildVehicleFormRubrics } from './helpers.js'
import { Table, Toolbar, ConfirmModal, Layout, FormModal } from '#src/components'
import { Person, Vehicle, label } from '#src/schemas'

export default function Main({ data, db }) {
  const [modal, setModal] = useState(null)
  const [activeTab, setActiveTab] = useState('people')
  const [keywordFilter, setKeywordFilter] = useState('')

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
        <FormModal.Modal
          title="יצירת רשומה חדשה - שוטר"
          form={
            <FormModal.Form
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
        <FormModal.Modal
          title="עריכת רשומה קיימת - שוטר"
          form={
            <FormModal.Form
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
        <FormModal.Modal
          title="יצירת רשומה חדשה - רכב"
          form={
            <FormModal.Form
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
        <FormModal.Modal
          title="עריכת רשומה קיימת - רכב"
          form={
            <FormModal.Form
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

  const handleContextMenuAction = (tableName, entry, action) => {
    switch (action) {
      case 'edit':
        setModal(modals[tableName].edit(entry))
        break
      case 'delete':
        setModal(modals[tableName].delete(entry))
        break
      default:
        throw new Error()
    }
  }

  const affiliationSort = (direction) => (a, b) => {
    if (a.affiliation < b.affiliation) return direction === 'ascending' ? -1 : 1
    if (a.affiliation > b.affiliation) return direction === 'ascending' ? 1 : -1
    if (a.rank < b.rank) return direction === 'ascending' ? 1 : -1
    if (a.rank > b.rank) return direction === 'ascending' ? -1 : 1
    return 0
  }

  function schemaToCols(Schema) {
    return Object.entries(Schema.properties).map(([key, val]) => ({
      name: key,
      label: val.hebrew,
      sortable: true, // TODO Only a defined set of cols will be sortable
      innerSort: null // TODO Add affiliation special sort
    }))
  }

  function collectionToRows(Schema, collection, filter = () => true) {
    return collection.filter(filter).map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => {
          const prop = Schema.properties[key]
          let label = value
          if (prop?.anyOf) {
            label = prop.anyOf[value]
          } else if (prop?.oneOf) {
            label = prop.oneOf[value]
          }
          return [key, { value, label }]
        })
      )
    )
  }

  // FIXME
  const vicfilter = ({ plate }) => [plate].some((col) => col && col.includes(keywordFilter))

  const tabs = {
    people: {
      title: 'כוח אדם',
      component: (
        <Table
          cols={schemaToCols(Person)}
          rows={collectionToRows(Person, data.people, ({ serviceNumber, firstName, lastName }) =>
            [serviceNumber, firstName, lastName].some((col) => col && col.includes(keywordFilter))
          )}
          contextMenu={{
            handleAction: handleContextMenuAction
          }}
        />
      )
    },
    vehicles: {
      title: 'רכבים',
      component: (
        <Table
          cols={schemaToCols(Vehicle)}
          rows={collectionToRows(Vehicle, data.vehicles)}
          contextMenu={{
            handleAction: handleContextMenuAction
          }}
        />
      )
    }
  }

  return (
    <>
      {modal}
      <Layout.ToolbarContainer>
        <Toolbar
          tabs={tabs}
          onSearchChange={(keyword) => setKeywordFilter(keyword)}
          onAddClick={() => setModal(modals[activeTab].create())}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          onAddButtonClick={handleAddButtonClick}
        />
      </Layout.ToolbarContainer>
      <Layout.TabContainer>
        {Object.entries(tabs).map(([tabName, { component }], idx) => (
          <div key={idx} style={{ display: activeTab === tabName ? 'block' : 'none' }}>
            {component}
          </div>
        ))}
      </Layout.TabContainer>
    </>
  )
}
