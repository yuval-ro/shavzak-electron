import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Database from './pages/Database'
import AddPersonForm from './pages/Database/AddPersonForm'

export default function App() {
  const [people, setPeople] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const people = await window.api.getAllPeople()
        setPeople(people)
        console.debug({ people })
      } catch (error) {
        console.error('Failed to fetch people:', error)
      }
    }
    fetchData()
  }, [])

  return <Database people={people} />
  // return (
  //   <Container fluid style={{ direction: 'rtl' }}>
  //     <Row>
  //       <Col>
  //         <AddPersonForm />
  //       </Col>
  //       <Col xs={6}></Col>
  //     </Row>
  //   </Container>
  // )
}
