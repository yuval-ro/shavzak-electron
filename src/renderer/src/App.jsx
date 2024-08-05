/**
 * @file /src/App.jsx
 */
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'react-bootstrap'
import styled from 'styled-components'

import TopNavbar from './nav/TopNavbar'
import * as Views from './views'
import { Layout } from "#src/components"

function generateShift(days, hour) {
  return {
    _id: crypto.randomUUID(),
    type: (() => {
      switch (hour) {
        case 6:
          return 'morning'
        case 14:
          return 'noon'
        case 2:
          return 'night'
        default:
          throw new Error()
      }
    })(),
    time: (() => {
      let time = new Date()
      time.setDate(time.getDate() + days)
      time.setHours(hour, 0, 0, 0)
      return time
    })(),
    available: [],
    assigned: {}
  }
}



export default function App() {
  const [bsDisplayMode, setBsDisplayMode] = useState('bg-dark text-light') // TODO Implement
  const [data, setData] = useState({ people: [], vehicles: [], campTasks: [] }) // TODO Use Zustand or React-Query
  const [shifts, setShifts] = useState([
    generateShift(1, 6),
    generateShift(1, 14),
    generateShift(2, 2)
  ])
  const [activeView, setActiveView] = useState('database')

  function handleShiftChange(updatedShift) {
    setShifts((shifts) =>
      shifts.map((shift) => (shift._id === updatedShift._id ? updatedShift : shift))
    )
  }

  function handleAttendanceChange(shiftId, personId) {
    setShifts((oldShifts) => {
      const newShifts = [...oldShifts]
      const shift = newShifts.find((shift) => shift._id === shiftId)
      if (shift.available.includes(personId)) {
        shift.available = shift.available.filter((id) => id !== personId)
      } else {
        shift.available.push(personId)
      }
      return newShifts
    })
  }

  const db = {
    readAll: async (collection) => {
      const dbDocs = await window.api.docs.readAll({ collection })
      setData((prevData) => ({
        ...prevData,
        [collection]: dbDocs
      }))
      return dbDocs
    },
    create: async (collection, document) => {
      const dbDocument = await window.api.docs.putOne({ collection, document })
      setData((prevData) => ({
        ...prevData,
        [collection]: [...prevData[collection], dbDocument]
      }))
    },
    update: async (collection, document) => {
      const dbDocument = await window.api.docs.putOne({ collection, document })
      setData((prevData) => ({
        ...prevData,
        [collection]: prevData[collection].map((item) =>
          item._id === dbDocument._id ? dbDocument : item
        )
      }))
    },
    delete: async (collection, document) => {
      const deletedId = await window.api.docs.removeOne({ collection, document })
      setData((prevData) => ({
        ...prevData,
        [collection]: prevData[collection].filter((item) => item._id !== deletedId)
      }))
    }
  }

  const views = {
    database: {
      label: 'מסד נתונים',
      component: <Views.Database data={data} db={db} />
    },
    attendance: {
      label: 'נוכחות',
      component: <Views.Attendance data={data} shifts={shifts} onChange={handleAttendanceChange} />
    },
    assignment: {
      label: 'שיבוץ',
      component: <Views.Assignment data={data} shifts={shifts} onShiftChange={handleShiftChange} />
    }
  }

  useEffect(() => {
    async function initAppStates() {
      const people = await db.readAll('people')
      const vehicles = await db.readAll('vehicles')
      const tasks = await db.readAll('campTasks')
      setShifts((oldShifts) => {
        const newShifts = oldShifts.map((shift) => {
          const newShift = shift
          newShift.available = people.map((person) => person._id)
          return newShift
        })
        return newShifts
      })
    }
    initAppStates()
  }, [])

  return (
    <ThemeProvider dir="rtl">
      <TopNavbar
        links={Object.entries(views).map(([key, val]) => ({ value: key, label: val.label }))}
        activeKey={activeView}
        onKeySelect={(key) => setActiveView(key)}
      />
      <Layout.ViewContainer>
        {Object.entries(views).map(([viewName, { component }], idx) => (
          <div key={idx} style={{ display: activeView === viewName ? 'block' : 'none' }}>
            {component}
          </div>
        ))}
      </Layout.ViewContainer>
    </ThemeProvider>
  )
}
