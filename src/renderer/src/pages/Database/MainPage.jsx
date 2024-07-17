import { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import Table from './Table'
import { AddPersonModal, AddVehicleModal } from './addFeature'
import ControlRow from './ControlRow'

import labels from '#src/labels.json'

export default function MainPage({ data, onAdd, onEdit, onDelete }) {
  const [modal, setModal] = useState(null)
  const [activeTab, setActiveTab] = useState('people') // State to track the active tab

  function handleAddButtonClick() {
    if (activeTab === 'people') {
      setModal(<AddPersonModal onSave={handleModalSave} onCancel={handleModalCancel} />)
    } else if (activeTab === 'vehicles') {
      setModal(<AddVehicleModal onSave={handleModalSave} onCancel={handleModalCancel} />)
    } else {
      setModal(null)
    }
  }

  function handleModalSave(values) {
    // TODO Implement
    console.debug({ values })
    setModal(null)
  }

  function handleModalCancel() {
    setModal(null)
  }

  return (
    <>
      {modal}
      <Tabs
        defaultActiveKey="people"
        className="px-0"
        onSelect={(key) => {
          setActiveTab(key)
        }}
      >
        <Tab eventKey="people" title="שוטרים">
          <ControlRow onAddClick={handleAddButtonClick} />
          <Table
            onDelete={(person) => onDelete('people', person)}
            onEdit={(person) => onEdit('people', person)}
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
        </Tab>
        <Tab eventKey="vehicles" title="רכבים">
          <ControlRow onAddClick={handleAddButtonClick} />
          <Table
            onDelete={(vehicle) => onDelete(vehicle)}
            onEdit={(vehicle) => onEdit(vehicle)}
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
        </Tab>
      </Tabs>
    </>
  )
}
