import { useEffect, useState } from 'react'
import styled from 'styled-components'
// import DatabasePage from './pages/Database'
import { AddPersonModal, AddVehicleModal } from './pages/Database/addFeature'

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

  return (
    // <OuterFrame>
    //   <InnerFrameContainer>
    //     <DatabasePage data={{ people, vehicles }} />
    //   </InnerFrameContainer>
    // </OuterFrame>
    <AddVehicleModal
      show={true}
      onSave={(values) => {
        console.debug({ values })
      }}
      onCancel={() => {
        alert('cancel')
      }}
    />
  )
}
