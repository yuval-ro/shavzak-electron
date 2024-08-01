import { useState } from 'react'
import * as yup from 'yup'

import CampSecurityTable from './camp-security-feature'
import Toolbar from '#src/components/Toolbar.jsx'
import { FormikForm, FormModal, INPUT_TYPES } from '#src/components/form-modal'

import TabContainer from '#src/components/TabContainer.jsx'

const TABS = [
  { name: 'campSecurity', title: 'אבטחת מחנה' },
  { name: 'fieldMissions', title: 'משימות חוץ' }
]

export default function Main({ data, shifts, onShiftChange }) {
  const [pagination, setPagination] = useState(0)
  const [perView, setPerView] = useState(3)
  const [activeTab, setActiveTab] = useState(TABS[0].name)
  const [modal, setModal] = useState(null)

  function handleModalCancel() {
    setModal(null)
  }
  function handleAddButtonClick() {
    setModal(modals[activeTab].create())
  }

  const tabs = {
    campSecurity: (
      <CampSecurityTable
        pagination={pagination}
        perView={perView}
        shifts={shifts}
        people={data?.people}
        onShiftChange={onShiftChange}
      />
    ),
    fieldMissions: null
  }

  const modals = {
    campSecurity: {
      create: () => (
        <FormModal
          title="יצירת משימה חדשה - אבטחת מחנה"
          formComponent={
            <FormikForm
              rubrics={[
                {
                  name: 'name',
                  label: 'שם',
                  required: true,
                  inputType: INPUT_TYPES.free,
                  validation: yup.string().required()
                }
              ]}
            />
          }
          onCancel={handleModalCancel}
        />
      )
    }
  }

  return (
    <>
      <Toolbar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={(selectedTab) => setActiveTab(selectedTab)}
        onAddButtonClick={handleAddButtonClick}
      />
      <TabContainer>
        {Object.entries(tabs).map(([tabName, tabComponent], idx) => (
          <div key={idx} style={{ display: tabName === activeTab ? 'block' : 'none' }}>
            {tabComponent}
          </div>
        ))}
      </TabContainer>
      {modal}
    </>
  )
}
