/**
 * @file /src/App.jsx
 */
import { useState } from 'react'
import { ThemeProvider } from 'react-bootstrap'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import TopNavbar from './nav/TopNavbar'
import Assignment from './views/Assignment/Assignment'
import Database from './views/Database/Database'
import { Layout } from '#src/components'

const queryClient = new QueryClient()

const SHIFT_TYPE = Object.freeze({
  6: 'morning',
  14: 'noon',
  22: 'night'
})

function generateShift(hour) {
  const start = new Date()
  start.setDate(start.getDate() + 1)
  start.setHours(hour, 0, 0, 0)
  const end = new Date(start)
  end.setHours(start.getHours() + 8, 0, 0, 0)
  return {
    _id: crypto.randomUUID(),
    type: SHIFT_TYPE[hour],
    start,
    end,
    available: [],
    assigned: {}
  }
}

export default function App() {
  const [bsDisplayMode, setBsDisplayMode] = useState('bg-dark text-light') // TODO Implement
  const [shifts, setShifts] = useState([generateShift(6), generateShift(14), generateShift(22)])
  const [activeView, setActiveView] = useState('database')
  const views = {
    database: {
      label: 'מסד נתונים',
      component: <Database />
    },
    assignment: {
      label: 'סידור עבודה',
      component: <Assignment shifts={shifts} />
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
