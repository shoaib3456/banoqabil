import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../config'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
    const disptach = useDispatch();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const { username, password } = formData;

    const navigate = useNavigate();

    //handle change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            alert('Please fill all the fields');
        }
        else {
                const body = { username, password };
                await axios.post(`${api.apiBaseUrl}/Auth/login`, body).then((res) => {
                    console.log(res.data);
                    disptach({ type: 'LOGIN' ,payload:res.data.role})
                    localStorage.setItem('token', res.data.token);
                    // localStorage.setItem('user', res.data.user);
                    localStorage.setItem('userid', res.data.userid);
                    navigate('/registration',{ replace: true });
                }).catch((err) => {
                    console.log(err);
                })

        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" onChange={handleChange} value={username} placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" onChange={handleChange} value={password} placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Text className="text-muted">
                    Didn't have an account <Link to="/signup" className='text-decoration-none' >Signup Here</Link>
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}

export default LoginForm