import React, { useEffect, useState } from 'react'
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import '../App.css'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material'

const AppNavbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserLogin = () => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  //logout
  const logout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
     navigate('/login')
  }

  useEffect(() => {
    checkUserLogin();
  }, [])

  return (
    <Navbar bg="bg-theme" sticky="top" className="shadow navbar-light theme-navbar" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} style={{ width: '160px' }} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* <Nav.Link className="active" href="/">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <NavDropdown title="Media Center" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Projects" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Other Youth Initiatives" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
            {
              isLoggedIn ? (
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    style={{ color: 'white', backgroundColor: '#2196f3', border: 'none' }}
                  >
                    Account
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={()=>navigate("/account")}>My Account</MenuItem>
                    <MenuItem onClick={()=>navigate("/admitCard")}>Admit Card</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </Menu>

                </div>
              )
                : (
                  <Nav.Link href="/login">Login</Nav.Link>
                )
            }
            {/* <Link to="/" className='btn btn-success rounded-pill ms-4' >اردو</Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}

export default AppNavbar