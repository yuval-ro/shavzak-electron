import { useEffect, useState } from 'react'
import { MainPage as DatabaseMainPage } from './pages/Database'

export default function App() {
  const [data, setData] = useState({ people: [], vehicles: [] })

  useEffect(() => {
    const fetchData = async () => {
      const people = await window.api.docs.readAll('people')
      const vehicles = await window.api.docs.readAll('vehicles')
      setData({ people, vehicles })
    }

    fetchData()
  }, [])

  const handlePost = async (collection, doc) => {
    const updated = await window.api.docs.putOne(collection, doc)
    setData((prevData) => ({
      ...prevData,
      [collection]: prevData[collection].map((item) => (item._id === updated._id ? updated : item))
    }))
  }

  const handleDelete = async (collection, doc) => {
    const deletedId = await window.api.docs.deleteOne(collection, doc)
    setData((prevData) => ({
      ...prevData,
      [collection]: prevData[collection].filter((item) => item._id !== deletedId)
    }))
  }

  return (
    <div
      style={{ display: 'grid', height: '100vh', padding: '50px', backgroundColor: 'lightgray' }}
    >
      <div style={{ backgroundColor: 'white', direction: 'rtl' }}>
        <DatabaseMainPage data={data} onPost={handlePost} onDelete={handleDelete} />
      </div>
    </div>
  )
}
