/**
 * @file /src/views/Database/Database.jsx
 */
import { useState } from 'react'

import ViewContext from './Context'
import CollectionTable from './CollectionTable'
import { Toolbar, ConfirmModal, Layout, FormModal } from '#src/components'
import { PersonSchema, VehicleSchema } from '#src/schemas'
import { createFormFieldArray, createTableCols, createTableRows } from '#src/helpers.js'
import { useCollection, useShifts } from '#src/store/hooks.js'

function getOrder(Schema, propName) {
  return Object.freeze(
    Object.fromEntries(Object.keys(Schema.props[propName]?.options).map((role, idx) => [role, idx]))
  )
}
const ACTIVE_ROLE_ORDER = getOrder(PersonSchema, 'activeRole')
const SERVICE_TYPE_ORDER = getOrder(PersonSchema, 'serviceType')

export default function Database() {
  const [modal, setModal] = useState(null)
  const [activeTab, setActiveTab] = useState('people')
  const [keywordFilter, setKeywordFilter] = useState('')
  const collections = {
    people: useCollection('people'),
    vehicles: useCollection('vehicles')
  }
  const shifts = useShifts()

  function handleModalConfirmDelete(collectionName, doc) {
    collections?.[collectionName]?.remove(doc)
    setModal(null)
  }

  function handleCreateModalSave(collectionName, values) {
    collections?.[collectionName]?.put(values)
    setModal(null)
  }

  function handleEditModalSave(collectionName, updatedDoc) {
    const { docs, put } = collections[collectionName]
    const existingDoc = docs?.find((doc) => doc._id === updatedDoc._id)
    if (JSON.stringify(updatedDoc) !== JSON.stringify(existingDoc)) {
      // Prevent unnecessary update if no changes were made
      put(updatedDoc)
    }
    setModal(null)
  }

  function handleModalCancel() {
    setModal(null)
  }

  function handleAddButtonClick() {
    setModal(modals[activeTab].getCreateModal())
  }

  function findDoc(docId) {
    const doc = collections[activeTab]?.docs?.find((doc) => doc._id === docId)
    if (!doc) {
      throw new Error('Unable to find doc: ' + JSON.stringify(docId))
    }
    return doc
  }

  const actions = {
    setStatus: (docId, newStatus) => {
      const shift = { ...shifts?.docs[shifts?.idx] }
      const includes = shift?.unavailable?.includes(docId)
      if (!includes && newStatus) {
        shift.unavailable = [...shift.unavailable, docId]
        shifts?.put(shift)
      } else if (includes && !newStatus) {
        shift.unavailable = shift.unavailable.filter((id) => id !== docId)
        shifts?.put(shift)
      }
    },
    promptEdit: (docId) => {
      const doc = findDoc(docId)
      setModal(modals[activeTab]?.getEditModal(doc))
    },
    promptDelete: (docId) => {
      const doc = findDoc(docId)
      setModal(modals[activeTab]?.getDeleteModal(doc))
    }
  }

  const peopleInnerSort = {
    affiliation: (sortDir) => (a, b) => {
      if (a.affiliation.value > b.affiliation.value) return -sortDir
      if (a.affiliation.value < b.affiliation.value) return sortDir
      if (ACTIVE_ROLE_ORDER[a.activeRole.value] > ACTIVE_ROLE_ORDER[b.activeRole.value])
        return sortDir
      if (ACTIVE_ROLE_ORDER[a.activeRole.value] < ACTIVE_ROLE_ORDER[b.activeRole.value])
        return -sortDir
      if (SERVICE_TYPE_ORDER[a.serviceType.value] > SERVICE_TYPE_ORDER[b.serviceType.value])
        return sortDir
      if (SERVICE_TYPE_ORDER[a.serviceType.value] < SERVICE_TYPE_ORDER[b.serviceType.value])
        return -sortDir
      if (a.rank.value < b.rank.value) return sortDir
      if (a.rank.value > b.rank.value) return -sortDir
      return 0
    }
  }

  const modals = {
    people: {
      getCreateModal: () => (
        <FormModal
          headerText="יצירת רשומה חדשה - שוטר"
          onSubmit={(values) => handleCreateModalSave('people', values)}
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm
            fieldArray={createFormFieldArray({
              schema: PersonSchema,
              docs: collections?.people?.docs
            })}
          />
        </FormModal>
      ),
      getEditModal: (person) => (
        <FormModal
          headerText="עריכת רשומה קיימת - שוטר"
          onSubmit={(values) => handleEditModalSave('people', { ...person, ...values })}
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm
            fieldArray={createFormFieldArray({
              schema: PersonSchema,
              docs: collections?.people?.docs,
              values: person
            })}
          />
        </FormModal>
      ),
      getDeleteModal: (person) => (
        <ConfirmModal
          title="מחיקת רשומה - שוטר"
          message="האם אתה בטוח למחוק את הרשומה? הפעולה אינה הפיכה."
          onConfirm={() => handleModalConfirmDelete('people', person)}
          onCancel={handleModalCancel}
        />
      )
    },
    vehicles: {
      getCreateModal: () => (
        <FormModal
          headerText="יצירת רשומה חדשה - רכב"
          onSubmit={(values) => handleCreateModalSave('vehicles', values)}
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm
            fieldArray={createFormFieldArray({
              schema: VehicleSchema,
              docs: collections?.vehicles?.docs
            })}
          />
        </FormModal>
      ),
      getEditModal: (vehicle) => (
        <FormModal
          headerText="עריכת רשומה קיימת - רכב"
          onSubmit={(values) => handleEditModalSave('vehicles', { ...vehicle, ...values })}
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm
            fieldArray={createFormFieldArray({
              schema: VehicleSchema,
              docs: collections?.vehicles?.docs,
              values: vehicle
            })}
          />
        </FormModal>
      ),
      getDeleteModal: (vehicle) => (
        <ConfirmModal
          title="מחיקת רשומה - רכב"
          message="האם אתה בטוח למחוק את הרשומה? הפעולה אינה הפיכה."
          onConfirm={() => handleModalConfirmDelete('vehicles', vehicle)}
          onCancel={handleModalCancel}
        />
      )
    }
  }

  const tabs = {
    people: {
      title: 'כוח אדם',
      component: (
        <CollectionTable
          shift={shifts?.docs[shifts?.idx]}
          collectionName="people"
          cols={createTableCols(PersonSchema, peopleInnerSort)}
          rows={createTableRows(PersonSchema, collections?.people?.docs ?? [])}
          keyword={keywordFilter}
          contextMenuActions={actions}
        />
      )
    },
    vehicles: {
      title: 'רכבים',
      component:
        // <CollectionTable
        //   collectionName="vehicles"
        //   cols={createTableCols(VehicleSchema)}
        //   rows={createTableRows(VehicleSchema, collections?.vehicles?.docs ?? [])}
        //   contextMenuActions={contextMenuActions}
        // />
        null
    }
  }

  return (
    <ViewContext.Provider value={{ actions }}>
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
    </ViewContext.Provider>
  )
}
