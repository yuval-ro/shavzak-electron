/**
 * @file /src/views/Database/Database.jsx
 */
import { useState } from 'react'

import CollectionTable from './CollectionTable'

import { Toolbar, ConfirmModal, Layout, FormModal } from '#src/components'
import { Person, Vehicle } from '#src/schemas'
import { schema2fieldArray, schema2cols, collection2rows } from '#src/helpers.js'

function getOrder(Schema, propName) {
  return Object.freeze(
    Object.fromEntries(
      Object.keys(Schema.properties[propName]?.oneOf).map((role, idx) => [role, idx])
    )
  )
}
const ACTIVE_ROLE_ORDER = getOrder(Person, 'activeRole')
const SERVICE_TYPE_ORDER = getOrder(Person, 'serviceType')

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

  function handleContextMenuAction(tableName, docId, action) {
    const doc = data[tableName]?.find((doc) => doc._id == docId)
    switch (action) {
      case 'edit':
        setModal(modals[tableName].edit(doc))
        break
      case 'delete':
        setModal(modals[tableName].delete(doc))
        break
      default:
        throw new Error()
    }
  }

  const peopleInnerSort = {
    affiliation: (sortDir) => (a, b) => {
      if (a.affiliation.value > b.affiliation.value) return sortDir
      if (a.affiliation.value < b.affiliation.value) return -sortDir
      if (ACTIVE_ROLE_ORDER[a.activeRole.value] > ACTIVE_ROLE_ORDER[b.activeRole.value])
        return -sortDir
      if (ACTIVE_ROLE_ORDER[a.activeRole.value] < ACTIVE_ROLE_ORDER[b.activeRole.value])
        return sortDir
      if (SERVICE_TYPE_ORDER[a.serviceType.value] > SERVICE_TYPE_ORDER[b.serviceType.value])
        return -sortDir
      if (SERVICE_TYPE_ORDER[a.serviceType.value] < SERVICE_TYPE_ORDER[b.serviceType.value])
        return sortDir
      if (a.rank.value < b.rank.value) return -sortDir
      if (a.rank.value > b.rank.value) return sortDir
      return 0
    }
  }

  // FIXME
  const vicfilter = ({ plate }) => [plate].some((col) => col && col.includes(keywordFilter))

  const modals = {
    people: {
      create: () => (
        <FormModal
          headerText="יצירת רשומה חדשה - שוטר"
          onSubmit={(values) => handleCreateModalSave('people', values)}
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm fieldArray={schema2fieldArray(Person)} />
        </FormModal>
      ),
      edit: (person) => (
        <FormModal
          headerText="עריכת רשומה קיימת - שוטר"
          onSubmit={(values) => handleEditModalSave('people', { ...person, ...values })}
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm fieldArray={schema2fieldArray(Person, person)} />
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
          <FormModal.InnerForm fieldArray={schema2fieldArray(Vehicle)} />
        </FormModal>
      ),
      edit: (vehicle) => (
        <FormModal
          headerText="עריכת רשומה קיימת - רכב"
          onSubmit={(values) => handleEditModalSave('vehicles', { ...vehicle, ...values })}
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm fieldArray={schema2fieldArray(Vehicle, vehicle)} />
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
          name="people"
          cols={schema2cols(Person, peopleInnerSort)}
          rows={collection2rows(Person, data.people, ({ serviceNumber, firstName, lastName }) =>
            [serviceNumber, firstName, lastName].some((col) => col && col.includes(keywordFilter))
          )}
          keyword={keywordFilter}
          contextMenu={{
            handleAction: handleContextMenuAction
          }}
        />
      )
    },
    vehicles: {
      title: 'רכבים',
      component: (
        <CollectionTable
          name="vehicles"
          cols={schema2cols(Vehicle)}
          rows={collection2rows(Vehicle, data.vehicles)}
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
