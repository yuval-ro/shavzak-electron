import { useEffect, useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import Database from './pages/Database'

export default function App() {
  const [data, setData] = useState({ people: [], vehicles: [] })
  const [currentPage, setCurrentPage] = useState('0')

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

  function renderCurrentPage() {
    switch (currentPage) {
      case '0':
        return <Database.MainPage data={data} onPost={handlePost} onDelete={handleDelete} />
      case '1':
        return
      case '2':
        return
      default:
        return null
    }
  }

  return (
    <div style={{ direction: 'rtl' }}>
      <Navbar style={{ backgroundColor: 'lightgray' }}>
        <Navbar.Brand>פלוגה מד</Navbar.Brand>
        <Nav
          variant="underline"
          activeKey={currentPage}
          onSelect={(key) => setCurrentPage(key)}
          style={{ dislpay: 'flex', justifyContent: 'start', marginRight: '30px' }}
        >
          <Nav.Item>
            <Nav.Link eventKey="0">מסד נתונים</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="1">נוכחות</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2">שיבוץ</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      <div style={{ width: '100%', alignContent: 'center', justifyContent: 'center' }}>
        <div style={{ margin: '10px' }}>{renderCurrentPage()}</div>
      </div>
    </div>
  )
}
