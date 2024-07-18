import { useEffect, useState } from 'react'
import Database from './views/Database'
import TopNavbar from './nav/TopNavbar'
import Attendance from './views/Attendance'

export default function App() {
  const [data, setData] = useState({ people: [], vehicles: [] })
  const [currentView, setCurrentView] = useState('0')

  useEffect(() => {
    const fetchData = async () => {
      const people = await window.api.docs.readAll('people')
      const vehicles = await window.api.docs.readAll('vehicles')
      setData({ people, vehicles })
    }

    fetchData()
  }, [])

  async function handlePost(collection, doc) {
    const updated = await window.api.docs.putOne(collection, doc)
    setData((prevData) => ({
      ...prevData,
      [collection]: prevData[collection].map((item) => (item._id === updated._id ? updated : item))
    }))
  }

  async function handleDelete(collection, doc) {
    const deletedId = await window.api.docs.deleteOne(collection, doc)
    setData((prevData) => ({
      ...prevData,
      [collection]: prevData[collection].filter((item) => item._id !== deletedId)
    }))
  }

  function handleNavKeySelect(key) {
    setCurrentView(key)
  }

  const views = [
    {
      title: 'נוכחות',
      component: <Attendance.Main data={data} />
    },
    {
      title: 'שיבוץ',
      component: null
    },
    {
      title: 'מסד נתונים',
      component: <Database.Main data={data} onPost={handlePost} onDelete={handleDelete} />
    }
  ]

  return (
    <div style={{ direction: 'rtl' }}>
      <TopNavbar views={views} activeKey={currentView} onKeySelect={handleNavKeySelect} />
      <div style={{ margin: '10px' }}>{views[currentView].component ?? null}</div>
    </div>
  )
}
