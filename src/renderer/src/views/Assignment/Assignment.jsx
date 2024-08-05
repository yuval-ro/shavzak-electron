/**
 * @file /src/views/Assignment/Assignment.jsx
 */
import { useState } from 'react'
import CampTasksTable from './TasksTable'
import { Toolbar, FormModal, Layout } from '#src/components'
import { schema2fieldArray } from '#src/helpers.js'
import { CampTask } from '#src/schemas'

export default function Main({ data, shifts, onShiftChange }) {
  const [pagination, setPagination] = useState(0)
  const [perView, setPerView] = useState(3)
  const [activeTab, setActiveTab] = useState('campTasks')
  const [modal, setModal] = useState(null)

  function handleModalSubmit(values) {
    console.debug({ values })
  }
  function handleModalCancel() {
    setModal(null)
  }
  function handleAddButtonClick() {
    setModal(modals[activeTab].create())
  }

  const tabs = {
    campTasks: {
      title: 'אבטחת מחנה',
      component: (
        <CampTasksTable
          pagination={pagination}
          perView={perView}
          shifts={shifts}
          people={data?.people}
          onShiftChange={onShiftChange}
        />
      )
    },
    fieldTasks: {
      title: 'משימות שטח',
      component: null
    }
  }

  const modals = {
    campTasks: {
      create: () => (
        <FormModal
          headerText="יצירת משימה חדשה - אבטחת מחנה"
          onSubmit={handleModalSubmit}
          onCancel={handleModalCancel}
        >
          <FormModal.InnerForm fieldArray={schema2fieldArray(CampTask)} />
        </FormModal>
      ),
      edit: (task) =>
        null
        // FIXME
        // <FormModal
        //   headerText="יצירת משימה חדשה - אבטחת מחנה"
        //   onSubmit={handleModalSubmit}
        //   onCancel={handleModalCancel}
        // >
        //   <FormModal.InnerForm fieldArray={[]} />
        // </FormModal>
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
