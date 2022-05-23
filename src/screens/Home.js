import React from 'react'
import AppNavbar from '../components/navbar'
import Topbar from '../components/topbar'
import Slider from '../components/slider'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DisplayCard from '../components/displayCard'
import displayCardImg1 from '../assets/HomeOnlineDonateBanner.jpg'
import displayCardImg2 from '../assets/display-card-2.jpg'
import VideoSlider from '../components/videoSlider'
import PartnerSlider from '../components/partnerSlider'
import Footer from '../components/footer'
import "./home.css"

const Home = () => {
    return (
        <>
            <AppNavbar />
            <Slider />

            <Container fluid>
                <Row className='my-4'>
                    <Col md={4}>
                        <div className="home-card my-2 bg-success text-white p-5 rounded-3">
                            <h2 className='fw-bold'>Who We Are?</h2>
                            <p className='my-3'>Alkhidmat Foundation Pakistan is one of the leading, non-profit organization, fully dedicated to humanitarian services since 1990. Alkhidmat workers and volunteers continue to work tirelessly for the relief of affected people across Pakistan and worldwide. Our dedicated services include disaster management, health services, education, orphan care, clean water, Mawakhat (interest-free loan) and other community services.</p>
                            <div className='d-flex justify-content-center'>
                                <Link to="/" className='btn-home'>Read More<i className="bi bi-caret-right ps-2"></i></Link>
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col md={4}>
                                <div className='home-card my-2 bg-danger p-4 rounded-3 text-center text-white'>
                                    <div className="home-icon">
                                        <i className="bi bi-briefcase-fill"></i>
                                    </div>
                                    <h3 className='lh-lg'>Dream Jobs</h3>
                                    <p>Entrepreneurship opportunities for sustainable employment growth</p>
                                    <div>
                                        <Link to="/registration" className='btn-home my-2'>Get Registered</Link>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='home-card my-2 bg-primary p-4 rounded-3 text-center text-white'>
                                    <div className="home-icon">
                                        <i className="bi bi-mortarboard-fill"></i>
                                    </div>
                                    <h3 className='lh-lg'>Donation</h3>
                                    <p>Entrepreneurship opportunities for sustainable employment growth</p>
                                    <div>
                                        <Link to="/" className='btn-home my-2'>Loan Statistics</Link>
                                    </div>
                                    <div>
                                        <Link to="/" className='btn-home my-2'>Apply for Loan</Link>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='home-card my-2 bg-success p-4 rounded-3 text-center text-white'>
                                    <div className="home-icon">
                                    <i className="bi bi-diagram-2"></i>
                                    </div>
                                    <h3 className='lh-lg'>Scholarships</h3>
                                    <p>Entrepreneurship opportunities for sustainable employment growth</p>
                                    <div>
                                        <Link to="/" className='btn-home my-2'>Loan Statistics</Link>
                                    </div>
                                    <div>
                                        <Link to="/" className='btn-home my-2'>Apply for Loan</Link>
                                    </div>
                                </div>
                            </Col>

                        </Row>
                    </Col>
                </Row>
                <h2 className='text-center text-secondary mt-5'>Ways To <strong>Donate</strong></h2>
                <Row className='my-5'>
                    <Col lg={6} md={6} sm={12} className="my-3" >
                        <DisplayCard cardTitle="Donate Online" linkText="Donate Now" cardPara="You can donate online using any Visa or MasterCard. You can also request a cheque or cash pickup." bgImg={displayCardImg1} />
                    </Col>
                    <Col lg={6} md={6} sm={12} className="my-3" >
                        <DisplayCard cardTitle="Direct Deposit" linkText="Read More" cardPara="Direct deposits or transfers can be made into our accounts at any of the banks. Select your preferred bank from the list to see the Alkhidmat Foundation Pakistan account details. If you wish to receive a receipt acknowledging your Zakat or donation after making a direct deposit, please email us at info@alkhidmat.org." bgImg={displayCardImg1} />
                    </Col>
                </Row>
            </Container>

            <Container fluid className='my-5'>
                <h2 className='text-center text-secondary my-5'>Media</h2>
                <VideoSlider />
            </Container>

            <Container fluid className='my-5'>
                <h2 className='text-center text-secondary my-5'>Our Partners</h2>
                <PartnerSlider />
            </Container>

            <Container fluid className="bg-primary py-5 my-5 px-5">
                <Row>
                    <Col md={7} className="text-white">
                        <h2>Suggestion & Complaints</h2>
                        <p>To share your feedback related to any of Bano Qabil, please download Citizens Portal Mobile App from Google & Apple Play Stores.</p>
                    </Col>
                    <Col>
                        <Link to="/" className='btn btn-info mx-2'>
                            Download on the
                            <h3>App Store</h3>
                        </Link>
                        <Link to="/" className='btn btn-success mx-2'>
                            Download on the
                            <h3>Google Play</h3>
                        </Link>
                    </Col>
                </Row>
            </Container>


            <Footer />
        </>
    )
}

export default Home