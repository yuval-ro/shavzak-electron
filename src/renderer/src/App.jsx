/**
 * @file /src/App.jsx
 */
import { useState } from 'react'
import { ThemeProvider } from 'react-bootstrap'

import TopNavbar from './nav/TopNavbar'
import * as Views from './views'
import { Layout } from '#src/components'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

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

  const views = {
    database: {
      label: 'מסד נתונים',
      component: <Views.Database />
    },
    attendance: {
      label: 'נוכחות',
      // component: <Views.Attendance shifts={shifts} onChange={handleAttendanceChange} />
      component: null
    },
    assignment: {
      label: 'שיבוץ',
      component: <Views.Assignment shifts={shifts} onShiftChange={handleShiftChange} />
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}
