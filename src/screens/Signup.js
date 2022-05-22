import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../components/footer'
import AppNavbar from '../components/navbar'
import SignupForm from '../components/signupForm'
import Topbar from '../components/topbar'

const Signup = () => {
    return (
        <>
            <AppNavbar />
            <Container className='my-5'>
                <h2 className="text-center my-4">SignUp</h2>
                <Row className="mb-5">
                    <Col lg={6} md={8} sm={12} className="bg-light border rounded-3 p-4 mx-auto">
                        <SignupForm />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Signup