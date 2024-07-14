import { useEffect, useState } from 'react'
import Database from './pages/Database'
import AddPersonForm from './pages/Database/AddPersonForm'

export default function App() {
  const [people, setPeople] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const people = await window.api.getPeople()
        setPeople(people)
      } catch (error) {
        console.error('Failed to fetch people:', error)
      }
    }
    fetchData()
  }, [])

  // return <Database people={people} />
  return (
    <div style={{ direction: 'rtl', width: '50%' }}>
      <AddPersonForm />
    </div>
  )
}
