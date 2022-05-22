import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './studentAdmitCard.css'

const StudentAdmitCard = () => {
  return (
    <Container>
      <Row>
        <Col md={4} className="mx-auto">
          <div className='admit-card'>StudentAdmitCard</div>
        </Col>
      </Row>
    </Container>
  )
}

export default StudentAdmitCard