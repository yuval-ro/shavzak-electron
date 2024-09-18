// Database.jsx
import { useState } from 'react'

import { Modal, Layout } from '#src/components'
import { PersonSchema, VehicleSchema } from '#src/schemas'
import { useCollection, useShifts } from '#src/store'

import Toolbar from './Toolbar'
import ViewContext from './Context'
import { useModal, useTable } from './hooks'

export default function Database() {
  const { updateModal } = Modal.useProvider()
  const [activeTab, setActiveTab] = useState('people')
  const [keywordFilter, setKeywordFilter] = useState('')
  const collections = {
    people: useCollection('people'),
    vehicles: useCollection('vehicles')
  }
  const shifts = useShifts()
  const currentShift = shifts?.docs[shifts?.idx]

  const modals = {
    people: useModal(PersonSchema, collections?.people),
    vehicles: useModal(VehicleSchema, collections?.vehicles)
  }

  const tabs = {
    people: {
      label: 'כוח אדם',
      table: useTable({
        schema: PersonSchema,
        collection: collections?.people,
        shift: currentShift
      })
    },
    vehicles: {
      label: 'רכבים',
      table: useTable({
        schema: VehicleSchema,
        collection: collections?.vehicles,
        shift: currentShift
      })
    }
  }

  const menuActions = {
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
    promptEditing: (docId) => updateModal(modals[activeTab]?.editing(docId)),
    promptRemoval: (docId) => updateModal(modals[activeTab]?.removal(docId))
  }

  return (
    <ViewContext.Provider value={{ actions: menuActions }}>
      <Toolbar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onAddButton={() => updateModal(modals[activeTab]?.creation())}
      />
      {Object.entries(tabs).map(([key, value], idx) => (
        <div key={idx} style={{ display: key === activeTab ? 'block' : 'none' }}>
          {value?.table}
        </div>
      ))}
    </ViewContext.Provider>
  )
}
