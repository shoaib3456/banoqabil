import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const DataCard = () => {
    return (
        <Container >
            <Row className='d-flex justify-content-center'>
                <Col lg={4}>
                    <div className='card shadow-sm rounded p-3'>
                        <h6 className="text-primary">Registration</h6>
                        <div>
                            <h1 className="fw-bold">10</h1>
                        </div>
                        <h5 className="text-muted">Total Registrations</h5>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className='card shadow-sm rounded p-3'>
                        <h6 className="text-primary">Male</h6>
                        <div>
                            <h1 className="fw-bold">6</h1>
                        </div>
                        <h5 className="text-muted">Total Male</h5>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className='card shadow-sm rounded p-3'>
                        <h6 className="text-primary">Female</h6>
                        <div>
                            <h1 className="fw-bold">4</h1>
                        </div>
                        <h5 className="text-muted">Total Female</h5>
                    </div>
                </Col>  
            </Row>
        </Container>
    )
}

export default DataCard