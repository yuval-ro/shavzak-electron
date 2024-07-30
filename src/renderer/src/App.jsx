import { useEffect, useState } from 'react'
import { ThemeProvider } from 'react-bootstrap'

import TopNavbar from './nav/TopNavbar'
import Database from './views/database'
import Attendance from './views/attendance'
import Assignment from './views/assignment'

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
  const [data, setData] = useState({ people: [], vehicles: [] })
  const [shifts, setShifts] = useState([
    generateShift(1, 6),
    generateShift(1, 14),
    generateShift(2, 2)
  ])
  const [activeView, setActiveView] = useState(0)

  function handleShiftChange(updatedShift) {
    setShifts((shifts) =>
      shifts.map((shift) => (shift._id === updatedShift._id ? updatedShift : shift))
    )
  }

  useEffect(() => {
    async function fetchData() {
      const people = await window.api.docs.readAll({ collection: 'people' })
      const vehicles = await window.api.docs.readAll({ collection: 'vehicles' })
      setData({ people, vehicles })
      setShifts((oldShifts) => {
        const newShifts = oldShifts.map((shift) => {
          const newShift = shift
          newShift.available = people.map((person) => person._id)
          return newShift
        })
        return newShifts
      })
    }
    fetchData()
  }, [])

  const dbOps = {
    post: async (collection, document) => {
      const updated = await window.api.docs.putOne({ collection, document })
      setData((prevData) => ({
        ...prevData,
        [collection]: prevData[collection].map((item) =>
          item._id === updated._id ? updated : item
        )
      }))
    },
    delete: async (collection, document) => {
      const deleted = await window.api.docs.deleteOne({ collection, document })
      setData((prevData) => ({
        ...prevData,
        [collection]: prevData[collection].filter((item) => item._id !== deleted._id)
      }))
    }
  }

  function handleNavKeySelect(key) {
    setActiveView(Number(key))
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

  const views = [
    {
      title: 'מסד נתונים',
      component: <Database.Main data={data} dbOps={dbOps} />
    },
    {
      title: 'נוכחות',
      component: <Attendance.Main data={data} shifts={shifts} onChange={handleAttendanceChange} />
    },
    {
      title: 'שיבוץ',
      component: <Assignment.Main data={data} shifts={shifts} onShiftChange={handleShiftChange} />
    }
  ]

  return (
    <ThemeProvider dir="rtl">
      <TopNavbar
        titles={views.map((view) => view?.title)}
        activeKey={activeView}
        onKeySelect={(key) => setActiveView(Number(key))}
      />
      <div style={{ margin: '20px' }}>
        {views.map((view, idx) => (
          <div key={idx} style={{ display: activeView === idx ? 'block' : 'none' }}>
            {view.component}
          </div>
        ))}
      </div>
      <button onClick={() => console.debug({ shifts })}>Console Debug Shifts</button>
    </ThemeProvider>
  )
}
