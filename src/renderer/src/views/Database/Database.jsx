/**
 * @file /src/views/Database/Database.jsx
 */
import { useState } from 'react'

import CollectionTable from './CollectionTable'
import { Toolbar, ConfirmModal, Layout, FormModal } from '#src/components'
import { PersonSchema, VehicleSchema } from '#src/schemas'
import { createFormFieldArray, createTableCols, createTableRows } from '#src/helpers.js'
import { useQueryStore, useShiftStore } from '#src/hooks'

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
  const queryStore = useQueryStore(['people', 'vehicles'])
  const { shifts, idx } = useShiftStore()

  function handleModalConfirmDelete(collection, doc) {
    queryStore[collection]?.delete(doc)
    setModal(null)
  }

  function handleCreateModalSave(collection, values) {
    queryStore[collection]?.post(values)
    setModal(null)
  }

  function handleEditModalSave(collection, updated) {
    const existing = queryStore[collection]?.read?.find((doc) => doc._id === updated._id)
    if (JSON.stringify(updated) !== JSON.stringify(existing)) {
      // NOTE Prevent unnecessary update if no changes were made
      queryStore[collection]?.post(updated)
    }
    setModal(null)
  }

  function handleModalCancel() {
    setModal(null)
  }

  function handleAddButtonClick() {
    setModal(modals[activeTab].create())
  }

  function handleContextMenuAction(collection, docId, action) {
    const doc = queryStore[collection]?.read?.find((doc) => doc._id == docId)
    setModal(modals[collection]?.[action]?.(doc))
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
      create: () => (
        <FormModal
          headerText="יצירת רשומה חדשה - שוטר"
          onSubmit={(values) => handleCreateModalSave('people', values)}
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm
            fieldArray={createFormFieldArray({
              schema: PersonSchema,
              docs: queryStore?.people?.read
            })}
          />
        </FormModal>
      ),
      edit: (person) => (
        <FormModal
          headerText="עריכת רשומה קיימת - שוטר"
          onSubmit={(values) => handleEditModalSave('people', { ...person, ...values })}
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm
            fieldArray={createFormFieldArray({
              schema: PersonSchema,
              docs: queryStore?.people?.read,
              values: person
            })}
          />
        </FormModal>
      ),
      delete: (person) => (
        <ConfirmModal
          title="מחיקת רשומה - שוטר"
          message="האם אתה בטוח למחוק את הרשומה? הפעולה אינה הפיכה."
          onConfirm={() => handleModalConfirmDelete('people', person)}
          onCancel={handleModalCancel}
        />
      )
    },
    vehicles: {
      create: () => (
        <FormModal
          headerText="יצירת רשומה חדשה - רכב"
          onSubmit={(values) => handleCreateModalSave('vehicles', values)}
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm
            fieldArray={createFormFieldArray({
              schema: VehicleSchema,
              docs: queryStore?.vehicles?.read
            })}
          />
        </FormModal>
      ),
      edit: (vehicle) => (
        <FormModal
          headerText="עריכת רשומה קיימת - רכב"
          onSubmit={(values) => handleEditModalSave('vehicles', { ...vehicle, ...values })}
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm
            fieldArray={createFormFieldArray({
              schema: VehicleSchema,
              docs: queryStore?.vehicles?.read,
              values: vehicle
            })}
          />
        </FormModal>
      ),
      delete: (vehicle) => (
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
          shift={shifts[idx]}
          collectionName="people"
          cols={createTableCols(PersonSchema, peopleInnerSort)}
          rows={createTableRows(PersonSchema, queryStore?.people?.read)}
          keyword={keywordFilter}
          onContextMenuAction={handleContextMenuAction}
        />
      )
    },
    vehicles: {
      title: 'רכבים',
      component: (
        <CollectionTable
          collectionName="vehicles"
          cols={createTableCols(VehicleSchema)}
          rows={createTableRows(VehicleSchema, queryStore?.vehicles?.read)}
          onContextMenuAction={handleContextMenuAction}
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
