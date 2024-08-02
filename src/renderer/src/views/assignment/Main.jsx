import { useState } from 'react'

import CampSecurityTable from './camp-security-feature'

import Toolbar from '#src/components/Toolbar.jsx'
import { Modal, Form } from '#src/components/form-modal'
import { TabContainer, ToolbarContainer } from '#src/components/styled.jsx'
import { buildCampTaskFormRubrics } from './helpers.js'

export default function Main({ data, shifts, onShiftChange }) {
  const [pagination, setPagination] = useState(0)
  const [perView, setPerView] = useState(3)
  const [activeTab, setActiveTab] = useState('campSecurity')
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
        <CampSecurityTable
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
        <Modal
          title="יצירת משימה חדשה - אבטחת מחנה"
          form={<Form rubrics={buildCampTaskFormRubrics()} onSubmit={handleModalSubmit} />}
          onCancel={handleModalCancel}
        />
      ),
      edit: (task) => (
        <Modal
          title="יצירת משימה חדשה - אבטחת מחנה"
          form={
            <Form
              rubrics={getRubrics.campSecurity({ initValues: task, takenIds: [] })}
              onSubmit={handleModalSubmit}
            />
          }
          onCancel={handleModalCancel}
        />
      )
    }
  }

  return (
    <>
      <ToolbarContainer>
        <Toolbar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(selectedTab) => setActiveTab(selectedTab)}
          onAddButtonClick={handleAddButtonClick}
        />
      </ToolbarContainer>
      <TabContainer>
        {Object.entries(tabs).map(([name, { component }], idx) => (
          <div key={idx} style={{ display: name === activeTab ? 'block' : 'none' }}>
            {component}
          </div>
        ))}
      </TabContainer>
      {modal}
    </>
  )
}
