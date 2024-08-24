/**
 * @file /src/App.jsx
 */
import { useState } from 'react'

import AppProviders from './Providers'
import { AppNavbar, Layout } from './components'
// FIXME import Assignment from './views/Assignment/Assignment'
import Database from './views/Database'

export default function App() {
  const [activeView, setActiveView] = useState('database')
  const views = {
    database: {
      label: 'מסד נתונים',
      component: <Database />
    },
    assignment: {
      label: 'סידור עבודה',
      // component: <Assignment /> // FIXME
      component: null
    }
  }

  return (
    <AppProviders>
      <AppNavbar
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
    </AppProviders>
  )
}
