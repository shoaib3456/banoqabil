import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import footerLogo from '../assets/logo.png'
import "./footer.css"

const Footer = () => {
    return (
        <footer className='bg-light'>
            <Container>
                <Row className="mb-4">
                    <Col lg={3} md={6} sm={12} className="my-3" >
                        <div>
                            <Link to="/">
                                <img src={footerLogo} className="img-fluid" alt="" />
                            </Link>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12} className="my-3" >
                        <h4>Useful Links</h4>
                        <ul className="mt-2">
                            <li>
                                <i className="bi bi-caret-right pe-2"></i>
                                <Link to="/" className="text-decoration-none text-secondary lh-lg">About Us</Link>
                            </li>
                            <li>
                                <i className="bi bi-caret-right pe-2"></i>
                                <Link to="/" className="text-decoration-none text-secondary lh-lg">Media Center</Link>
                            </li>
                            <li>
                                <i className="bi bi-caret-right pe-2"></i>
                                <Link to="/" className="text-decoration-none text-secondary lh-lg">NYD Framework</Link>
                            </li>
                            <li>
                                <i className="bi bi-caret-right pe-2"></i>
                                <Link to="/" className="text-decoration-none text-secondary lh-lg">Loan Scheme</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={3} md={6} sm={12} className="my-3" >
                        <h4>Facebook Feed</h4>
                        <ul className="mt-2">
                            <li>
                                <i className="bi bi-caret-right pe-2"></i>
                                <Link to="/" className="text-decoration-none text-secondary lh-lg">About Us</Link>
                            </li>
                            <li>
                                <i className="bi bi-caret-right pe-2"></i>
                                <Link to="/" className="text-decoration-none text-secondary lh-lg">Media Center</Link>
                            </li>
                            <li>
                                <i className="bi bi-caret-right pe-2"></i>
                                <Link to="/" className="text-decoration-none text-secondary lh-lg">NYD Framework</Link>
                            </li>
                            <li>
                                <i className="bi bi-caret-right pe-2"></i>
                                <Link to="/" className="text-decoration-none text-secondary lh-lg">Loan Scheme</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={3} className="my-3">
                        <h4>Twitter Feed</h4>
                        <ul className="mt-2">
                            <li>
                                <i className="bi bi-caret-right pe-2"></i>
                                <Link to="/" className="text-decoration-none text-secondary lh-lg">About Us</Link>
                            </li>
                            <li>
                                <i className="bi bi-caret-right pe-2"></i>
                                <Link to="/" className="text-decoration-none text-secondary lh-lg">Media Center</Link>
                            </li>
                            <li>
                                <i className="bi bi-caret-right pe-2"></i>
                                <Link to="/" className="text-decoration-none text-secondary lh-lg">NYD Framework</Link>
                            </li>
                            <li>
                                <i className="bi bi-caret-right pe-2"></i>
                                <Link to="/" className="text-decoration-none text-secondary lh-lg">Loan Scheme</Link>
                            </li>
                        </ul>
                    </Col>
                </Row>

            </Container>
            <Container fluid className='bg-dark p-4 text-white d-lg-flex'>
                <div className='text-center text-lg-start f-1 my-3'>
                    <div>&copy; Copyright 2021 Bano Qabil</div>
                    <div>
                        Powered by <Link to="/" className='text-decoration-none text-success'>Alkhidmat Foundation Pakistan</Link>
                    </div>
                </div>
                <div className='text-center text-lg-end pt-lg-0 my-3'>
                    <Link to="/" className='icon-box t-bg'>
                        <i className="bi bi-twitter"></i>
                    </Link>
                    <Link to="/" className='icon-box f-bg'>
                        <i className="bi bi-facebook"></i>
                    </Link>
                    <Link to="/" className='icon-box i-bg'>
                        <i className="bi bi-instagram"></i>
                    </Link>
                    <Link to="/" className='icon-box y-bg'>
                        <i className="bi bi-youtube"></i>
                    </Link>
                </div>
            </Container>
        </footer>
    )
}

export default Footer