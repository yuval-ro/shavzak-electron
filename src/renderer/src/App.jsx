import { useEffect, useState } from 'react'
import { MainPage as DatabaseMainPage } from './pages/Database'

export default function App() {
  const [data, setData] = useState({ people: [], vehicles: [] })

  useEffect(() => {
    const fetchData = async () => {
      const people = await window.api.readDocs('people')
      const vehicles = await window.api.readDocs('vehicles')
      setData({ people, vehicles })
    }

    fetchData()
  }, [])

  const handleEdit = async (collection, doc) => {
    const updated = await window.api.updateDoc(collection, doc)
    setData((prevData) => ({
      ...prevData,
      [collection]: prevData[collection].map((item) => (item._id === updated._id ? updated : item))
    }))
  }

  const handleAdd = async (collection, doc) => {
    const newDoc = await window.api.createDoc(collection, doc)
    setData((prevData) => ({
      ...prevData,
      [collection]: [...prevData[collection], newDoc]
    }))
  }

  const handleDelete = async (collection, doc) => {
    await window.api.deleteDoc(collection, doc)
    setData((prevData) => ({
      ...prevData,
      [collection]: prevData[collection].filter((item) => item._id !== doc._id)
    }))
  }

  return (
    <div
      style={{ display: 'grid', height: '100vh', padding: '50px', backgroundColor: 'lightgray' }}
    >
      <div style={{ backgroundColor: 'white', direction: 'rtl' }}>
        <DatabaseMainPage
          data={data}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
