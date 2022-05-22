import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../components/footer'
import LoginForm from '../components/loginForm'
import AppNavbar from '../components/navbar'
import Topbar from '../components/topbar'

const Login = () => {
    return (
        <>
            <AppNavbar />
            <Container className='my-5'>
                <h2 className="text-center my-4">Login</h2>
                <Row className="mb-5">
                    <Col lg={6} md={8} sm={12} className="bg-light border rounded-3 p-4 mx-auto">
                        <LoginForm />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Login