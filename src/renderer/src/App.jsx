import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import DatabasePage from './pages/Database'
import AddPersonForm from './pages/Database/forms/VehicleForm'

export default function App() {
  const [people, setPeople] = useState([])
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    async function fetchPeople() {
      const data = await window.api.getAllPeople()
      return data
    }
    const fetchVehicles = async () => {
      const data = await window.api.getAllVehicles()
      return data
    }
    fetchPeople().then((people) => setPeople(people))
    fetchVehicles().then((vehicles) => setVehicles(vehicles))
  }, [])
  
  const OuterFrame = styled.div`
    display: grid;
    height: 100vh;
    padding: 50px;
    background-color: lightgray;
  `
  const InnerFrameContainer = styled.div`
    background-color: white;
    direction: rtl;
  `

  return (
    <OuterFrame>
      <InnerFrameContainer>
        <DatabasePage data={{ people, vehicles }} />
      </InnerFrameContainer>
    </OuterFrame>
  )
}
