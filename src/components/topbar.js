import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const Topbar = () => {
  return (
    <Container fluid className="bg-danger d-flex align-items-center">
      <marquee direction="left">
        {/* <Row className="justify-content-end">
          <Col className='d-none d-md-flex align-items-center justify-content-end'>
            <Link to="/" className='mx-2 text-decoration-none text-light'>
              <i className="bi bi-twitter"></i>
            </Link>
            <Link to="/" className='mx-2 text-decoration-none text-light'>
              <i className="bi bi-facebook"></i>
            </Link>
            <Link to="/" className='mx-2 text-decoration-none text-light'>
              <i className="bi bi-instagram"></i>
            </Link>
            <Link to="/" className='mx-2 text-decoration-none text-light'>
              <i className="bi bi-youtube"></i>
            </Link>
          </Col>
        </Row> */}
        <p className='text-light mt-3' style={{fontSize: '10px'}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum aliquam itaque ipsa neque quae, libero nihil eos dicta impedit mollitia voluptas voluptate eaque cupiditate animi porro molestias possimus necessitatibus facilis?</p>
      </marquee>
    </Container>
  )


}

export default Topbar