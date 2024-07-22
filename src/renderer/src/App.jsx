import { useEffect, useState } from 'react'
import Database from './views/Database'
import TopNavbar from './nav/TopNavbar'
import Attendance from './views/Attendance'

function getTime(days, hour) {
  let time = new Date()
  time.setDate(time.getDate() + days)
  time.setHours(hour, 0, 0, 0)
  return time
}

export default function App() {
  const [data, setData] = useState({ people: [], vehicles: [] })
  const [shifts, setShifts] = useState([
    {
      _id: crypto.randomUUID(),
      type: 'morning',
      time: getTime(1, 6),
      available: [],
      assigned: []
    },
    {
      _id: crypto.randomUUID(),
      type: 'noon',
      time: getTime(1, 14),
      available: [],
      assigned: []
    },
    {
      _id: crypto.randomUUID(),
      type: 'night',
      time: getTime(2, 2),
      available: [],
      assigned: []
    }
  ])
  const [activeView, setActiveView] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const people = await window.api.docs.readAll('people')
      const vehicles = await window.api.docs.readAll('vehicles')
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
      component: <Database.Main data={data} onPost={handlePost} onDelete={handleDelete} />
    },
    {
      title: 'נוכחות',
      component: <Attendance.Main data={data} shifts={shifts} onChange={handleAttendanceChange} />
    },
    {
      title: 'שיבוץ',
      component: null
    }
  ]

  return (
    <div style={{ direction: 'rtl' }}>
      <TopNavbar
        titles={views.map((view) => view?.title)}
        activeKey={activeView}
        onKeySelect={handleNavKeySelect}
      />
      <div style={{ margin: '20px' }}>
        {views.map((view, idx) => (
          <div key={idx} style={{ display: activeView === idx ? 'block' : 'none' }}>
            {view.component}
          </div>
        ))}
      </div>
    </div>
  )
}
