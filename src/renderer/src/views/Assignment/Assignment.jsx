/**
 * @file /src/views/Assignment/Assignment.jsx
 */
import { useState } from 'react'
import TasksTable from './TasksTable'
import { Toolbar, FormModal, ConfirmModal, Layout } from '#src/components'
import { createFormFieldArray } from '#src/helpers.js'
import { CampTaskSchema } from '#src/schemas'
import { useQueryStore } from '#src/hooks/react-query'
import { arrayMoveImmutable } from 'array-move'

export default function Assignment({ shifts, onShiftChange }) {
  const [pagination, setPagination] = useState(0)
  const [activeTab, setActiveTab] = useState('campTasks')
  const [modal, setModal] = useState(null)
  const queryStore = useQueryStore(['campTasks', 'people'])

  function handleSubmitCreateModal(collection, values) {
    queryStore[collection]?.post(values)
    setModal(null)
  }
  function handleSubmitEditModal(collection, updated) {
    const existing = queryStore[collection]?.read?.find((doc) => doc._id === updated._id)
    if (JSON.stringify(updated) !== JSON.stringify(existing)) {
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
  function handleTasksReorder(collection, newIndex, oldIndex) {
    const existing = queryStore[collection]?.read
    const updated = arrayMoveImmutable(existing, oldIndex, newIndex).map((item, idx) => ({
      ...item,
      idx
    }))
    if (JSON.stringify(updated) !== JSON.stringify(existing)) {
      queryStore[collection]?.post(updated)
    }
  }
  function handleConfirmDeletion(collection, doc) {
    queryStore[collection]?.delete(doc)
    setModal(null)
  }
  function handleContextMenuAction(collection, docId, action) {
    const doc = queryStore[collection]?.read?.find((doc) => doc._id == docId)
    setModal(modals[collection]?.[action]?.(doc))
  }

  const modals = {
    campTasks: {
      create: () => (
        <FormModal
          headerText="יצירת משימה חדשה - אבטחת מחנה"
          onSubmit={(values) =>
            handleSubmitCreateModal('campTasks', {
              ...values,
              idx: queryStore?.campTasks?.read?.length
            })
          }
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm
            fieldArray={createFormFieldArray({
              schema: CampTaskSchema,
              docs: queryStore?.campTasks?.read,
              values: { start: shifts[pagination]?.start, end: shifts[pagination]?.end }
            })}
          />
        </FormModal>
      ),
      edit: (campTask) => (
        <FormModal
          headerText="עריכת משימה קיימת - אבטחת מחנה"
          onSubmit={
            (values) => handleSubmitEditModal('campTasks', { ...campTask, ...values }) // FIXME
          }
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm
            fieldArray={createFormFieldArray({
              schema: CampTaskSchema,
              docs: queryStore?.campTasks?.read,
              values: campTask
            })}
          />
        </FormModal>
      ),
      delete: (campTask) => (
        <ConfirmModal
          title="מחיקת רשומה - רכב"
          message="האם אתה בטוח למחוק את הרשומה? הפעולה אינה הפיכה."
          onConfirm={() => handleConfirmDeletion('campTasks', campTask)}
          onCancel={handleModalCancel}
        />
      )
    }
  }

  const tabs = {
    campTasks: {
      title: 'אבטחת מחנה',
      component: (
        <TasksTable
          cols={['name', 'start', 'end']}
          rows={queryStore?.campTasks?.read}
          people={queryStore?.people?.read}
          onShiftChange={onShiftChange}
          onReorder={({ newIndex, oldIndex }) =>
            handleTasksReorder('campTasks', newIndex, oldIndex)
          }
          onContextMenuAction={(docId, action) =>
            handleContextMenuAction('campTasks', docId, action)
          }
        />
      )
    },
    fieldTasks: {
      title: 'משימות שטח',
      component: null
      // <TasksTable
      //   cols={['name', 'start', 'end', 'assignees']}
      //   rows={store?.campTasks?.read}
      //   people={store?.people?.read}
      //   pagination={pagination}
      //   perView={perView}
      //   shifts={shifts}
      //   onShiftChange={onShiftChange}
      //   onReorder={({ newIndex, oldIndex }) =>
      //     handleTasksReorder('campTasks', newIndex, oldIndex)
      //   }
      //   onContextMenuAction={(docId, action) =>
      //     handleContextMenuAction('campTasks', docId, action)
      //   }
      // />
    }
  }

  return (
    <>
      <Layout.ToolbarContainer>
        <Toolbar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(selectedTab) => setActiveTab(selectedTab)}
          onAddButtonClick={handleAddButtonClick}
        />
      </Layout.ToolbarContainer>
      <Layout.TabContainer>
        {Object.entries(tabs).map(([name, { component }], idx) => (
          <div key={idx} style={{ display: name === activeTab ? 'block' : 'none' }}>
            {component}
          </div>
        ))}
      </Layout.TabContainer>
      {modal}
    </>
  )
}
