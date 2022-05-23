import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import api from '../config';

const SignupForm = () => {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  })

  const navigate = useNavigate();

  const { name, username, password } = formData;

  //handle form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  //signup axios signup request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (name === '' || username === '' || password === '') {
      alert('Please fill all the fields');
    }
    else {
      try {
        const body = { name, username, password };
        const response = await fetch(`${api.apiBaseUrl}/Auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        if (parseRes.success) {
          setLoading(false);
        }
        console.log(parseRes);
        navigate('/login');
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" onChange={handleChange} value={name} placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" onChange={handleChange} value={username} placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" onChange={handleChange} value={password} placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Text className="text-muted">
          Already have an account <Link to="/login" className='text-decoration-none' >Login Here</Link>
        </Form.Text>
      </Form.Group>
      <Button disabled={loading?true:false} variant="primary" type="submit">
        {loading ? 'Loading...' : 'Signup'}
      </Button>
    </Form>
  )
}

export default SignupForm