import { useState } from 'react'
import { Tabs, Tab, Button, Form } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'

import Table from './Table'
import labels from '../../hebrew_labels.json'
import { PersonForm } from './addFeature'

export default function Page({ data }) {
  const personForm = (
    <PersonForm labels={labels.person} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
  )
  const vehicleForm = null // TODO <VehicleForm labels={labels.vehicle} onSubmit={handleFormSubmit} />
  const ManpowerTable = (
    <Table
      data={data?.people}
      cols={[
        { key: 'service_number', translate: false },
        { key: 'first_name', translate: false },
        { key: 'last_name', translate: false },
        { key: 'sex', translate: true },
        { key: 'service_type', translate: true },
        { key: 'rank', translate: true },
        { key: 'active_role', translate: true },
        { key: 'professions', translate: true },
        { key: 'licenses', translate: true },
        { key: 'affiliation', translate: true }
      ]}
      sortFn={(a, b) => {
        if (a.affiliation < b.affiliation) return -1
        if (a.affiliation > b.affiliation) return 1
        if (
          a.service_type === 'officer' &&
          (b.service_type === 'enlisted' || b.service_type === 'nco')
        )
          return -1
        if (
          b.service_type === 'officer' &&
          (a.service_type === 'enlisted' || a.service_type === 'nco')
        )
          return 1
        if (a.service_type === 'nco' && b.service_type === 'enlisted') return -1
        if (b.service_type === 'nco' && a.service_type === 'enlisted') return 1
        if (a.active_role === 'platoon_sergeant' && b.active_role === 'trooper') return -1
        if (b.active_role === 'platoon_sergeant' && a.active_role === 'trooper') return 1
        if (a.rank < b.rank) return 1
        if (a.rank > b.rank) return -1
        return a.first_name.localeCompare(b.first_name)
      }}
      labels={labels.person}
      abbreviated={true}
      onAddButtonClick={handleAddButtonClick}
      labelFn={(person) =>
        `${labels.person.rank[person?.rank][1] ?? labels.person.rank[person?.rank][0]} ${person?.first_name} ${person?.last_name}`
      }
    />
  )
  const VehicleTable = (
    <Table
      data={data?.vehicles}
      cols={[
        { key: 'plate_number', translate: false },
        { key: 'type', translate: true },
        { key: 'seats', translate: false }
      ]}
      sortFn={(a, b) => {
        if (a.type < b.type) return -1
        if (a.type > b.type) return 1
        if (a.plate_number < b.plate_number) return -1
        if (a.plate_number > b.plate_number) return 1
        return 0
      }}
      labels={labels.vehicle}
      abbreviated={true}
      onAddButtonClick={handleAddButtonClick}
      labelFn={(vehicle) => `${labels.vehicle.type[vehicle?.type]}, ${vehicle?.plate_number}`}
    />
  )
  const ControlRow = (
    <div style={{ display: 'flex', margin: '5px' }}>
      <Form.Control type="text" placeholder="חיפוש" style={{ marginLeft: '10px' }} />
      <Button
        variant="outline-primary"
        onClick={handleAddButtonClick}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '3px',
          width: '70px',
          justifyContent: 'space-between'
        }}
      >
        <small>הוספה</small>
        <FaPlus />
      </Button>
    </div>
  )

  const [showFormModal, setShowFormModal] = useState(false)
  const [form, setForm] = useState(personForm)
  const [activeTab, setActiveTab] = useState('people') // State to track the active tab
  const [searchFilter, setSearchFilter] = useState('')

  function handleTabSelect(key) {
    setActiveTab(key) // Update the active tab state
    console.debug({ key })
    if (key === 'people') {
      setForm(personForm)
    } else if (key === 'vehicles') {
      setForm(vehicleForm) // Do nothing for vehicles as per the TODO IGNORE
    }
  }

  function handleAddButtonClick() {
    if (activeTab === 'people') {
      setForm(personForm)
      setShowFormModal(true) // Show the modal
    } else if (activeTab === 'vehicles') {
      setForm(vehicleForm)
      setShowFormModal(true) // Show the modal
    }
  }

  function handleFormCancel() {
    setShowFormModal(false)
  }

  function getModalHeader() {
    if (activeTab === 'people') {
      return 'הוסף שוטר'
    } else if (activeTab === 'vehicles') {
      return 'הוסף רכב'
    }
  }

  function handleFormSubmit(values) {
    // TODO This...
  }

  return (
    <div>
      <Tabs defaultActiveKey="people" className="px-0" onSelect={handleTabSelect}>
        <Tab eventKey="people" title="שוטרים">
          {ControlRow}
          {ManpowerTable}
        </Tab>
        <Tab eventKey="vehicles" title="רכבים">
          {ControlRow}
          {VehicleTable}
        </Tab>
      </Tabs>
    </div>
  )
}
